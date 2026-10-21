import { TestBed } from '@angular/core/testing';
import { ScoreService } from './score.service';
import { SCORE_REGISTRY } from '../data/score.registery';
import { AUBADE_MATINALE_ID } from '../data/identifiers/score-identifiers';
import { resetPersistenceForTests, seedPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('ScoreService', () => {
  let service: ScoreService;

  const freshService = (): ScoreService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(ScoreService);
  };

  beforeEach(() => {
    resetPersistenceForTests();
    service = freshService();
  });

  it('defaults to Si♭ with every score in registry order', () => {
    expect(service.tone()).toBe('sib');
    expect(service.isOrderOriginal()).toBeTrue();
    expect(service.scores().map((s) => s.id)).toEqual(
      SCORE_REGISTRY.map((s) => s.id)
    );
  });

  it('persists the tone the user picked', () => {
    service.setTone('mib');
    expect(service.scores()[0].keySignature).toBe(
      SCORE_REGISTRY[0].getScore('mib').keySignature
    );

    expect(freshService().tone()).toBe('mib');
  });

  it('persists removed scores and hides them from the list', () => {
    service.toggleScore(AUBADE_MATINALE_ID.id);
    expect(service.isScoreRemoved(AUBADE_MATINALE_ID.id)).toBeTrue();
    expect(service.scores().some((s) => s.id === AUBADE_MATINALE_ID.id)).toBeFalse();

    const reloaded = freshService();
    expect(reloaded.isScoreRemoved(AUBADE_MATINALE_ID.id)).toBeTrue();

    reloaded.toggleScore(AUBADE_MATINALE_ID.id);
    expect(freshService().isScoreRemoved(AUBADE_MATINALE_ID.id)).toBeFalse();
  });

  it('persists a custom order and can reset it', () => {
    const [first, second, ...rest] = service.order();
    service.setOrder([second, first, ...rest]);

    expect(service.isOrderOriginal()).toBeFalse();
    expect(service.scores()[0].id).toBe(second);
    expect(freshService().order()[0]).toBe(second);

    service.resetOrder();
    expect(service.isOrderOriginal()).toBeTrue();
    expect(freshService().isOrderOriginal()).toBeTrue();
  });

  it('does not mutate the array handed to setOrder', () => {
    const custom = [...service.order()].reverse();
    const snapshot = [...custom];
    service.setOrder(custom);
    expect(custom).toEqual(snapshot);
  });

  it('drops unknown ids and appends scores missing from a stored order', () => {
    const ids = SCORE_REGISTRY.map((s) => s.id);
    seedPersistenceForTests(
      'scoreOrder',
      JSON.stringify(['does-not-exist', ids[2], ids[0], ids[0]])
    );
    const order = freshService().order();
    expect(order.length).toBe(ids.length);
    expect(order.slice(0, 2)).toEqual([ids[2], ids[0]]);
    expect(new Set(order).size).toBe(ids.length);
  });

  it('survives corrupt storage', () => {
    seedPersistenceForTests('scoreOrder', '{not json');
    seedPersistenceForTests('removedScores', '42');
    seedPersistenceForTests('scoreTone', 'xyz');
    const reloaded = freshService();
    expect(reloaded.tone()).toBe('sib');
    expect(reloaded.isOrderOriginal()).toBeTrue();
    expect(reloaded.removedScores().size).toBe(0);
  });
});
