import { Injectable, signal, computed } from '@angular/core';
import { SCORE_REGISTRY } from '../data/score.registery';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private readonly TONE_STORAGE_KEY = 'scoreTone';
  private readonly ORDER_STORAGE_KEY = 'scoreOrder';

  tone = signal<'sib' | 'mib'>(this.loadTone());
  order = signal<string[]>(this.loadOrder());

  scores = computed(() => {
    const currentTone = this.tone();
    const currentOrder = this.order();

    const orderMap = new Map(currentOrder.map((id, index) => [id, index]));

    const sortedRegistry = [...SCORE_REGISTRY].sort((a, b) => {
      const orderA = orderMap.get(a.id) ?? a.number;
      const orderB = orderMap.get(b.id) ?? b.number;
      return orderA - orderB;
    });

    const response = sortedRegistry.map((entry) => entry.getScore(currentTone));

    return response;
  });

  constructor() {}

  private saveTone() {
    localStorage.setItem(this.TONE_STORAGE_KEY, this.tone());
  }

  private saveOrder() {
    localStorage.setItem(this.ORDER_STORAGE_KEY, JSON.stringify(this.order()));
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

  getOrder() {
    return this.order();
  }
}
