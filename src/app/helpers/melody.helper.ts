import { Accidental, StaveNote, StaveTie } from 'vexflow';
import { Score } from '../types/score.type';
import { Tone } from '../types/tone.type';

/** One playable step of a melody. `midi` is null for a rest. */
export interface MelodyEvent {
  /** Offset from the start, in eighth notes. */
  startEighths: number;
  durationEighths: number;
  midi: number | null;
  /** Slurred into the next note: no gap, no re-attack. */
  legato: boolean;
}

/** VexFlow resolution: 16384 ticks per whole note, so 2048 per eighth. */
const TICKS_PER_EIGHTH = 2048;

/** Accidentals implied by each key signature used in the scores, per note letter. */
const KEY_SIGNATURES: Record<string, Record<string, number>> = {
  C: {},
  F: { B: -1 },
  Bb: { B: -1, E: -1 },
  Eb: { B: -1, E: -1, A: -1 },
  G: { F: 1 },
  D: { F: 1, C: 1 },
  A: { F: 1, C: 1, G: 1 },
};

const ACCIDENTAL_SHIFT: Record<string, number> = { '#': 1, '##': 2, b: -1, bb: -2, n: 0 };

/**
 * Semitones from written to sounding pitch. Si♭ (trumpet) sounds a major second lower
 * than written, the Mi♭ petite clarinette a minor third higher. In these arrangements the
 * Mi♭ part is written a fifth above the Si♭ part, so it sounds an octave above the trumpet,
 * as it does in the street.
 */
export function concertTransposition(tone: Tone): number {
  return tone === 'sib' ? -2 : 3;
}

/** Turns a score's VexFlow notes into a timed melody. */
export function scoreToMelody(score: Score, transposeSemitones = 0): MelodyEvent[] {
  const keyAlterations = KEY_SIGNATURES[score.keySignature] ?? {};
  const tiedTo = new Map<StaveNote, StaveNote>();
  for (const measure of score.measures) {
    for (const tie of measure.ties ?? []) {
      const { first_note, last_note } = (tie as StaveTie).getNotes();
      if (first_note && last_note) {
        tiedTo.set(last_note as StaveNote, first_note as StaveNote);
      }
    }
  }

  const events: MelodyEvent[] = [];
  let cursor = 0;
  for (const measure of score.measures) {
    const measureAccidentals = new Map<string, number>();
    for (const note of measure.notes) {
      const duration = note.getTicks().value() / TICKS_PER_EIGHTH;
      let midi: number | null = null;
      if (!note.isRest()) {
        const props = note.getKeyProps()[0];
        const letter = props.key.toUpperCase();
        const slot = `${letter}${props.octave}`;
        const explicit = (note.getModifiersByType('Accidental') as Accidental[])[0]?.type;
        let shift: number;
        if (explicit !== undefined && explicit in ACCIDENTAL_SHIFT) {
          shift = ACCIDENTAL_SHIFT[explicit];
          measureAccidentals.set(slot, shift);
        } else if (props.accidental) {
          shift = 0; // already folded into int_value by VexFlow (e.g. keys like 'bb/4')
        } else {
          shift = measureAccidentals.get(slot) ?? keyAlterations[letter] ?? 0;
        }
        midi = (props.int_value ?? 0) + 12 + shift + transposeSemitones;
      }

      const previous = events[events.length - 1];
      if (tiedTo.has(note) && previous && previous.midi !== null && midi !== null) {
        if (previous.midi === midi) {
          previous.durationEighths += duration; // a tie: one longer note
          cursor += duration;
          continue;
        }
        previous.legato = true; // a slur between different pitches
      }
      events.push({ startEighths: cursor, durationEighths: duration, midi, legato: false });
      cursor += duration;
    }
  }
  return events;
}

/** Total length in eighth notes. */
export function melodyLengthEighths(events: readonly MelodyEvent[]): number {
  const last = events[events.length - 1];
  return last ? last.startEighths + last.durationEighths : 0;
}
