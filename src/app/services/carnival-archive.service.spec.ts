import { TestBed } from '@angular/core/testing';
import { CarnivalArchiveService } from './carnival-archive.service';
import { ScoreHistory } from '../types/score-history.type';
import { resetPersistenceForTests, seedPersistenceForTests } from 'src/app/helpers/storage.helper';

const entries: ScoreHistory[] = [
  { historyId: 'b', scoreId: 'classe', scoreTitle: 'La classe', scoreNumber: 12, date: '2026-02-15T11:00:00.000Z' },
  { historyId: 'a', scoreId: 'doudou', scoreTitle: 'El doudou', scoreNumber: 19, date: '2026-02-15T10:00:00.000Z' },
];

describe('CarnivalArchiveService', () => {
  const fresh = (): CarnivalArchiveService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(CarnivalArchiveService);
  };

  beforeEach(() => resetPersistenceForTests());

  it('saves a trimmed, chronologically sorted snapshot and persists it', () => {
    const service = fresh();
    const saved = service.save({ name: '  Binche 2026 ', location: 'Binche', description: '' }, entries);

    expect(saved.name).toBe('Binche 2026');
    expect(saved.entries.map((e) => e.historyId)).toEqual(['a', 'b']);
    expect(service.isEmpty()).toBeFalse();

    const reloaded = fresh();
    expect(reloaded.getById(saved.id)?.location).toBe('Binche');
  });

  it('lists newest first, updates details and removes', () => {
    const service = fresh();
    const first = service.save({ name: 'Un', location: '', description: '' }, entries);
    const second = service.save({ name: 'Deux', location: '', description: '' }, entries);
    expect(service.carnivalsNewestFirst()[0].id).toBe(second.id);

    service.update(first.id, { name: 'Un bis', location: 'Là', description: 'Note' });
    expect(service.getById(first.id)?.name).toBe('Un bis');
    expect(service.getById(first.id)?.entries.length).toBe(2);

    service.remove(second.id);
    expect(service.carnivals().map((c) => c.id)).toEqual([first.id]);
    expect(fresh().carnivals().length).toBe(1);
  });

  it('ignores corrupt storage', () => {
    seedPersistenceForTests('savedCarnivals', '[{"id": 1}]');
    expect(fresh().isEmpty()).toBeTrue();
  });
});
