import { computed, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CarnivalDetails, SavedCarnival } from '../types/saved-carnival.type';
import { ScoreHistory } from '../types/score-history.type';
import { readJson, writeJson } from '../helpers/storage.helper';

const isSavedCarnivalArray = (value: unknown): value is SavedCarnival[] =>
  Array.isArray(value) &&
  value.every((item) => {
    const record = item as Record<string, unknown> | null;
    return (
      typeof record === 'object' &&
      record !== null &&
      typeof record['id'] === 'string' &&
      typeof record['name'] === 'string' &&
      Array.isArray(record['entries'])
    );
  });

const normalise = (details: CarnivalDetails): CarnivalDetails => ({
  name: details.name.trim(),
  location: details.location.trim(),
  description: details.description.trim(),
});

/** Saved carnivals: a named, dated snapshot of the announcement history. */
@Injectable({
  providedIn: 'root',
})
export class CarnivalArchiveService {
  private readonly STORAGE_KEY = 'savedCarnivals';

  readonly carnivals = signal<SavedCarnival[]>(this.load());
  readonly isEmpty = computed(() => this.carnivals().length === 0);
  /** Most recently saved first (saves are appended, so this is the stored order reversed). */
  readonly carnivalsNewestFirst = computed(() => [...this.carnivals()].reverse());

  save(details: CarnivalDetails, entries: readonly ScoreHistory[]): SavedCarnival {
    const carnival: SavedCarnival = {
      id: uuidv4(),
      ...normalise(details),
      savedAt: new Date().toISOString(),
      entries: [...entries].sort((a, b) => a.date.localeCompare(b.date)),
    };
    this.set([...this.carnivals(), carnival]);
    return carnival;
  }

  update(id: string, details: CarnivalDetails) {
    this.set(
      this.carnivals().map((c) => (c.id === id ? { ...c, ...normalise(details) } : c))
    );
  }

  remove(id: string) {
    this.set(this.carnivals().filter((c) => c.id !== id));
  }

  getById(id: string): SavedCarnival | undefined {
    return this.carnivals().find((c) => c.id === id);
  }

  private set(carnivals: SavedCarnival[]) {
    this.carnivals.set(carnivals);
    writeJson(this.STORAGE_KEY, carnivals);
  }

  private load(): SavedCarnival[] {
    return readJson(this.STORAGE_KEY, [], isSavedCarnivalArray);
  }
}
