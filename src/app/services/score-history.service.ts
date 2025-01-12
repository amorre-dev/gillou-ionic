import { computed, Injectable, signal } from '@angular/core';
import { ScoreHistory } from '../types/score-history.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ScoreHistoryService {
  private readonly STORAGE_KEY = 'scoreHistory';
  scoreHistory = signal<ScoreHistory[]>(this.loadFromStorage());

  constructor() {}

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scoreHistory()));
  }

  private loadFromStorage(): ScoreHistory[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addToHistory(scoreId: string, scoreTitle: string, scoreNumber: number) {
    this.scoreHistory.update((sh) => {
      const updated = [
        ...sh,
        {
          historyId: uuidv4(),
          scoreId: scoreId,
          scoreTitle: scoreTitle,
          scoreNumber: scoreNumber,
          date: new Date(),
        },
      ];
      this.saveToStorage();
      return updated;
    });
  }

  removeFromHistory(historyId: string) {
    this.scoreHistory.update((sh) => {
      const updated = sh.filter((item) => item.historyId !== historyId);
      this.saveToStorage();
      return updated;
    });
  }

  removeLastByScoreId(scoreId: string) {
    this.scoreHistory.update((sh) => {
      const index = [...sh]
        .reverse()
        .findIndex((item) => item.scoreId === scoreId);

      if (index === -1) {
        return sh;
      }
      const actualIndex = sh.length - 1 - index;

      const updated = sh.filter((_, i) => i !== actualIndex);
      this.saveToStorage();
      return updated;
    });
  }

  deleteHistory() {
    this.scoreHistory.set([]);
    this.saveToStorage();
  }

  getOccurrences(scoreId: string) {
    return computed(
      () =>
        this.scoreHistory().filter((item) => item.scoreId === scoreId).length
    );
  }
}
