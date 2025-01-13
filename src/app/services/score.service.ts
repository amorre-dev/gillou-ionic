import { Injectable, signal, computed } from '@angular/core';
import { SCORE_REGISTRY } from '../data/score.registery';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private readonly TONE_STORAGE_KEY = 'scoreTone';
  private readonly ORDER_STORAGE_KEY = 'scoreOrder';
  private readonly REMOVED_STORAGE_KEY = 'removedScores';

  tone = signal<'sib' | 'mib'>(this.loadTone());
  order = signal<string[]>(this.loadOrder());
  removedScores = signal<Set<string>>(this.loadRemovedScores());

  scores = computed(() => {
    const currentTone = this.tone();
    const currentOrder = this.order();
    const removed = this.removedScores();

    const orderMap = new Map(currentOrder.map((id, index) => [id, index]));

    const sortedRegistry = [...SCORE_REGISTRY]
      .filter((score) => !removed.has(score.id)) // Exclude removed scores
      .sort((a, b) => {
        const orderA = orderMap.get(a.id) ?? a.number;
        const orderB = orderMap.get(b.id) ?? b.number;
        return orderA - orderB;
      });

    return sortedRegistry.map((entry) => entry.getScore(currentTone));
  });

  isOrderOriginal = computed(() => {
    const defaultOrder = SCORE_REGISTRY.map((score) => score.id);
    const currentOrder = this.order();
    return (
      defaultOrder.length === currentOrder.length &&
      defaultOrder.every((id, index) => id === currentOrder[index])
    );
  });

  constructor() {}

  private saveTone() {
    localStorage.setItem(this.TONE_STORAGE_KEY, this.tone());
  }

  private saveOrder() {
    localStorage.setItem(this.ORDER_STORAGE_KEY, JSON.stringify(this.order()));
  }

  private saveRemovedScores() {
    localStorage.setItem(this.REMOVED_STORAGE_KEY, JSON.stringify([...this.removedScores()]));
  }

  private loadTone(): 'sib' | 'mib' {
    const storedTone = localStorage.getItem(this.TONE_STORAGE_KEY);
    return storedTone === 'mib' ? 'mib' : 'sib'; // Default to 'sib'
  }

  private loadOrder(): string[] {
    const storedOrder = localStorage.getItem(this.ORDER_STORAGE_KEY);
    return storedOrder && storedOrder !== 'undefined'
      ? JSON.parse(storedOrder)
      : SCORE_REGISTRY.map((score) => score.id);
  }

  private loadRemovedScores(): Set<string> {
    const storedRemoved = localStorage.getItem(this.REMOVED_STORAGE_KEY);
    return storedRemoved ? new Set(JSON.parse(storedRemoved)) : new Set();
  }

  setTone(newTone: 'sib' | 'mib') {
    this.tone.update(() => {
      this.saveTone();
      return newTone;
    });
  }

  setOrder(newOrder: string[]) {
    this.order.update(() => {
      this.saveOrder();
      return newOrder;
    });
  }

  resetOrder() {
    this.order.update(() => {
      const defaultOrder = SCORE_REGISTRY.map((score) => score.id);
      this.saveOrder();
      return defaultOrder;
    });
  }

  toggleScore(scoreId: string) {
    this.removedScores.update((current) => {
      const updated = new Set(current);
      if (updated.has(scoreId)) {
        updated.delete(scoreId); // Add back
      } else {
        updated.add(scoreId); // Remove
      }
      this.saveRemovedScores();
      return updated;
    });
  }

  isScoreRemoved(scoreId: string): boolean {
    return this.removedScores().has(scoreId);
  }

  getOrder() {
    return this.order();
  }

}

