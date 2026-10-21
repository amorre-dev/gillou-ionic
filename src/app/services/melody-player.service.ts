import { Injectable, signal } from '@angular/core';
import { Score } from '../types/score.type';
import { Tone } from '../types/tone.type';
import { concertTransposition, melodyLengthEighths, scoreToMelody } from '../helpers/melody.helper';
import { readRaw, writeRaw } from '../helpers/storage.helper';

export const TEMPO_MIN = 60;
export const TEMPO_MAX = 160;
export const TEMPO_DEFAULT = 110;

/** Plays a score's melody with Web Audio, with a brassy voice for Si♭ and a reedy one for Mi♭. */
@Injectable({
  providedIn: 'root',
})
export class MelodyPlayerService {
  private readonly TEMPO_KEY = 'tempo';

  /** Id of the score currently playing, or null. */
  readonly playingScoreId = signal<string | null>(null);
  /** Quarter-note beats per minute (eighths are derived, so 6/8 keeps the same pulse). */
  readonly tempo = signal(this.loadTempo());

  private context: AudioContext | null = null;
  private voices: { stop: () => void }[] = [];
  private endTimer: ReturnType<typeof setTimeout> | null = null;

  get isSupported(): boolean {
    return typeof window !== 'undefined' && 'AudioContext' in window;
  }

  setTempo(bpm: number) {
    const clamped = Math.min(TEMPO_MAX, Math.max(TEMPO_MIN, Math.round(bpm)));
    this.tempo.set(clamped);
    writeRaw(this.TEMPO_KEY, String(clamped));
  }

  /** Starts a score; calling it for the score already playing stops it. */
  toggle(score: Score) {
    if (this.playingScoreId() === score.id) {
      this.stop();
    } else {
      this.play(score);
    }
  }

  play(score: Score) {
    this.stop();
    const context = this.ensureContext();
    if (!context) {
      return;
    }
    void context.resume();

    const events = scoreToMelody(score, concertTransposition(score.tone));
    const eighth = 30 / this.tempo(); // seconds per eighth note
    const start = context.currentTime + 0.08;
    for (const event of events) {
      if (event.midi === null) {
        continue;
      }
      const at = start + event.startEighths * eighth;
      const length = event.durationEighths * eighth;
      this.voices.push(playNote(context, score.tone, event.midi, at, length, event.legato));
    }
    this.playingScoreId.set(score.id);
    const total = melodyLengthEighths(events) * eighth + 0.4;
    this.endTimer = setTimeout(() => this.stop(), total * 1000);
  }

  stop() {
    if (this.endTimer) {
      clearTimeout(this.endTimer);
      this.endTimer = null;
    }
    for (const voice of this.voices) {
      voice.stop();
    }
    this.voices = [];
    this.playingScoreId.set(null);
  }

  private ensureContext(): AudioContext | null {
    if (!this.isSupported) {
      return null;
    }
    if (!this.context) {
      this.context = new AudioContext();
    }
    return this.context;
  }

  private loadTempo(): number {
    const stored = Number(readRaw(this.TEMPO_KEY));
    return Number.isFinite(stored) && stored >= TEMPO_MIN && stored <= TEMPO_MAX ? stored : TEMPO_DEFAULT;
  }
}

const midiToHz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/** A simple subtractive voice: oscillator → low-pass → envelope. */
function playNote(
  context: AudioContext,
  tone: Tone,
  midi: number,
  at: number,
  length: number,
  legato: boolean
): { stop: () => void } {
  const brass = tone === 'sib';
  const osc = context.createOscillator();
  osc.type = brass ? 'sawtooth' : 'square';
  osc.frequency.value = midiToHz(midi);

  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = brass ? 2200 : 1500;
  filter.Q.value = brass ? 1.2 : 0.7;

  const gain = context.createGain();
  const peak = brass ? 0.22 : 0.18;
  const attack = 0.02;
  const release = legato ? 0.01 : 0.05;
  const sounding = Math.max(0.05, length * (legato ? 1 : 0.92));
  const end = at + sounding;
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(peak, at + attack);
  gain.gain.linearRampToValueAtTime(peak * 0.8, at + attack + 0.06);
  gain.gain.setValueAtTime(peak * 0.8, Math.max(at + attack + 0.06, end - release));
  gain.gain.linearRampToValueAtTime(0, end);

  osc.connect(filter).connect(gain).connect(context.destination);
  osc.start(at);
  osc.stop(end + 0.02);

  return {
    stop: () => {
      try {
        gain.gain.cancelScheduledValues(context.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, context.currentTime);
        gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.03);
        osc.stop(context.currentTime + 0.04);
      } catch {
        // already stopped
      }
    },
  };
}
