import { Injectable, signal, computed } from '@angular/core';
import { SCORE_REGISTRY } from '../data/score.registery';
import {
  isStringArray,
  readJson,
  readRaw,
  writeJson,
  writeRaw,
} from '../helpers/storage.helper';
import { Score } from '../types/score.type';

import { Tone } from '../types/tone.type';

export type { Tone };

const DEFAULT_ORDER: readonly string[] = SCORE_REGISTRY.map((entry) => entry.id);

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private readonly TONE_STORAGE_KEY = 'scoreTone';
  private readonly ORDER_STORAGE_KEY = 'scoreOrder';
  private readonly REMOVED_STORAGE_KEY = 'removedScores';

  readonly tone = signal<Tone>(this.loadTone());
  readonly order = signal<string[]>(this.loadOrder());
  readonly removedScores = signal<ReadonlySet<string>>(this.loadRemovedScores());

  /** Scores to display: current tone, user order, without the scores the user disabled. */
  readonly scores = computed<Score[]>(() => {
    const tone = this.tone();
    const removed = this.removedScores();
    const position = new Map(this.order().map((id, index) => [id, index]));

    return [...SCORE_REGISTRY]
      .filter((entry) => !removed.has(entry.id))
      .sort(
        (a, b) =>
          (position.get(a.id) ?? DEFAULT_ORDER.length) -
          (position.get(b.id) ?? DEFAULT_ORDER.length)
      )
      .map((entry) => entry.getScore(tone));
  });

  readonly isOrderOriginal = computed(() => {
    const current = this.order();
    return (
      current.length === DEFAULT_ORDER.length &&
      DEFAULT_ORDER.every((id, index) => id === current[index])
    );
  });

  setTone(tone: Tone) {
    this.tone.set(tone);
    writeRaw(this.TONE_STORAGE_KEY, tone);
  }

  setOrder(newOrder: readonly string[]) {
    this.order.set(this.reconcileOrder(newOrder));
    writeJson(this.ORDER_STORAGE_KEY, this.order());
  }

  resetOrder() {
    this.setOrder(DEFAULT_ORDER);
  }

  toggleScore(scoreId: string) {
    const updated = new Set(this.removedScores());
    if (updated.has(scoreId)) {
      updated.delete(scoreId);
    } else {
      updated.add(scoreId);
    }
    this.removedScores.set(updated);
    writeJson(this.REMOVED_STORAGE_KEY, [...updated]);
  }

  isScoreRemoved(scoreId: string): boolean {
    return this.removedScores().has(scoreId);
  }

  private loadTone(): Tone {
    return readRaw(this.TONE_STORAGE_KEY) === 'mib' ? 'mib' : 'sib';
  }

  private loadOrder(): string[] {
    return this.reconcileOrder(
      readJson(this.ORDER_STORAGE_KEY, [...DEFAULT_ORDER], isStringArray)
    );
  }

  private loadRemovedScores(): Set<string> {
    const known = new Set(DEFAULT_ORDER);
    return new Set(
      readJson(this.REMOVED_STORAGE_KEY, [], isStringArray).filter((id) =>
        known.has(id)
      )
    );
  }

  /**
   * Keeps only known score ids (once each, in the given order) and appends
   * any score missing from it, so a score added to the registry later still shows up.
   */
  private reconcileOrder(order: readonly string[]): string[] {
    const known = new Set(DEFAULT_ORDER);
    const kept = order.filter(
      (id, index) => known.has(id) && order.indexOf(id) === index
    );
    const missing = DEFAULT_ORDER.filter((id) => !kept.includes(id));
    return [...kept, ...missing];
  }
}
