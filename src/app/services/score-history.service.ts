import { computed, Injectable, signal } from '@angular/core';
import { ScoreHistory } from '../types/score-history.type';
import { v4 as uuidv4 } from 'uuid';
import { Observable, Subject } from 'rxjs';
import { readJson, writeJson } from '../helpers/storage.helper';

const isScoreHistoryArray = (value: unknown): value is ScoreHistory[] =>
  Array.isArray(value) &&
  value.every((item) => {
    const record = item as Record<string, unknown> | null;
    return (
      typeof record === 'object' &&
      record !== null &&
      typeof record['historyId'] === 'string' &&
      typeof record['scoreId'] === 'string'
    );
  });

@Injectable({
  providedIn: 'root',
})
export class ScoreHistoryService {
  private readonly STORAGE_KEY = 'scoreHistory';

  /** Chronological: oldest first. */
  readonly scoreHistory = signal<ScoreHistory[]>(this.loadFromStorage());
  readonly isHistoryEmpty = computed(() => this.scoreHistory().length === 0);
  /** For display: newest first. A copy, so the stored order is never mutated. */
  readonly scoreHistoryNewestFirst = computed(() =>
    [...this.scoreHistory()].reverse()
  );
  /** scoreId -> number of times it was announced. */
  private readonly added = new Subject<{ entry: ScoreHistory; before: ScoreHistory[] }>();
  /** Emits every new announcement together with the history as it was just before. */
  readonly added$: Observable<{ entry: ScoreHistory; before: ScoreHistory[] }> =
    this.added.asObservable();

  readonly occurrences = computed(() => {
    const counts = new Map<string, number>();
    for (const item of this.scoreHistory()) {
      counts.set(item.scoreId, (counts.get(item.scoreId) ?? 0) + 1);
    }
    return counts;
  });

  addToHistory(scoreId: string, scoreTitle: string, scoreNumber: number) {
    const before = this.scoreHistory();
    const entry: ScoreHistory = {
      historyId: uuidv4(),
      scoreId,
      scoreTitle,
      scoreNumber,
      date: new Date().toISOString(),
    };
    this.setHistory([...before, entry]);
    this.added.next({ entry, before });
  }

  removeFromHistory(historyId: string) {
    this.setHistory(
      this.scoreHistory().filter((item) => item.historyId !== historyId)
    );
  }

  /** Removes the most recent announcement of the given score, if any. */
  removeLastByScoreId(scoreId: string) {
    const history = this.scoreHistory();
    const index = history.map((item) => item.scoreId).lastIndexOf(scoreId);
    if (index === -1) {
      return;
    }
    this.setHistory(history.filter((_, i) => i !== index));
  }

  deleteHistory() {
    this.setHistory([]);
  }

  getOccurrences(scoreId: string): number {
    return this.occurrences().get(scoreId) ?? 0;
  }

  private setHistory(history: ScoreHistory[]) {
    this.scoreHistory.set(history);
    writeJson(this.STORAGE_KEY, history);
  }

  private loadFromStorage(): ScoreHistory[] {
    return readJson(this.STORAGE_KEY, [], isScoreHistoryArray);
  }
}
