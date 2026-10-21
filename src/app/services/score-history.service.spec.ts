import { TestBed } from '@angular/core/testing';
import { ScoreHistoryService } from './score-history.service';

describe('ScoreHistoryService', () => {
  let service: ScoreHistoryService;

  const freshService = (): ScoreHistoryService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(ScoreHistoryService);
  };

  beforeEach(() => {
    localStorage.clear();
    service = freshService();
  });

  it('starts empty', () => {
    expect(service.isHistoryEmpty()).toBeTrue();
    expect(service.getOccurrences('doudou')).toBe(0);
  });

  it('counts announcements per score and persists every one of them', () => {
    service.addToHistory('doudou', 'El doudou', 19);
    service.addToHistory('classe', 'La classe', 12);
    service.addToHistory('doudou', 'El doudou', 19);

    expect(service.getOccurrences('doudou')).toBe(2);
    expect(service.getOccurrences('classe')).toBe(1);

    const reloaded = freshService();
    expect(reloaded.scoreHistory().length).toBe(3);
    expect(reloaded.getOccurrences('doudou')).toBe(2);
  });

  it('lists newest first without mutating the chronological history', () => {
    service.addToHistory('doudou', 'El doudou', 19);
    service.addToHistory('classe', 'La classe', 12);

    expect(service.scoreHistoryNewestFirst()[0].scoreId).toBe('classe');
    expect(service.scoreHistoryNewestFirst()[0].scoreId).toBe('classe');
    expect(service.scoreHistory()[0].scoreId).toBe('doudou');
  });

  it('removes the most recent announcement of a score', () => {
    service.addToHistory('doudou', 'El doudou', 19);
    service.addToHistory('classe', 'La classe', 12);
    service.addToHistory('doudou', 'El doudou', 19);
    const firstDoudou = service.scoreHistory()[0].historyId;

    service.removeLastByScoreId('doudou');

    expect(service.scoreHistory().map((h) => h.scoreId)).toEqual(['doudou', 'classe']);
    expect(service.scoreHistory()[0].historyId).toBe(firstDoudou);

    service.removeLastByScoreId('unknown');
    expect(service.scoreHistory().length).toBe(2);
  });

  it('removes a single entry by id and clears everything', () => {
    service.addToHistory('doudou', 'El doudou', 19);
    service.addToHistory('classe', 'La classe', 12);
    const id = service.scoreHistory()[0].historyId;

    service.removeFromHistory(id);
    expect(service.scoreHistory().map((h) => h.scoreId)).toEqual(['classe']);
    expect(freshService().scoreHistory().length).toBe(1);

    service.deleteHistory();
    expect(service.isHistoryEmpty()).toBeTrue();
    expect(freshService().isHistoryEmpty()).toBeTrue();
  });

  it('ignores corrupt stored history', () => {
    localStorage.setItem('scoreHistory', '[{"nope": true}]');
    expect(freshService().isHistoryEmpty()).toBeTrue();
    localStorage.setItem('scoreHistory', 'garbage');
    expect(freshService().isHistoryEmpty()).toBeTrue();
  });
});
