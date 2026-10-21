import { evaluateEasterEggs } from './easter-eggs.helper';
import { ScoreHistory } from '../types/score-history.type';
import {
  AIR_CLASSIQUE_ID,
  AUBADE_MATINALE_ID,
  DOUDOU_ID,
  MARINS_ID,
  PAS_DE_CHARGE_ID,
  POSTILLON_DE_LONGJUMEAU_ID,
} from '../data/identifiers/score-identifiers';

let n = 0;
const at = (scoreId: string, local: string): ScoreHistory => ({
  historyId: 'h' + n++,
  scoreId,
  scoreTitle: scoreId,
  scoreNumber: 0,
  date: new Date(local).toISOString(),
});
const ids = (eggs: { id: string }[]) => eggs.map((e) => e.id);
const selected = [AIR_CLASSIQUE_ID.id, DOUDOU_ID.id, MARINS_ID.id];

describe('evaluateEasterEggs', () => {
  it('celebrates the first full round of the day, once', () => {
    const earlier = [at(AIR_CLASSIQUE_ID.id, '2026-02-15T10:00'), at(DOUDOU_ID.id, '2026-02-15T10:05')];
    const completing = at(MARINS_ID.id, '2026-02-15T10:10');
    expect(ids(evaluateEasterEggs(completing, earlier, selected))).toEqual(['premier-carnet']);

    const again = at(DOUDOU_ID.id, '2026-02-15T10:20');
    expect(evaluateEasterEggs(again, [...earlier, completing], selected)).toEqual([]);

    // Yesterday's round does not count for today
    const nextDay = at(MARINS_ID.id, '2026-02-16T10:10');
    expect(evaluateEasterEggs(nextDay, [...earlier, completing], selected)).toEqual([]);
  });

  it('teases a late Aubade matinale, once per day', () => {
    const morning = at(AUBADE_MATINALE_ID.id, '2026-02-15T09:00');
    expect(evaluateEasterEggs(morning, [], selected)).toEqual([]);

    const afternoon = at(AUBADE_MATINALE_ID.id, '2026-02-15T15:00');
    expect(ids(evaluateEasterEggs(afternoon, [morning], selected))).toEqual(['aubade-tardive']);

    const evening = at(AUBADE_MATINALE_ID.id, '2026-02-15T22:00');
    expect(evaluateEasterEggs(evening, [morning, afternoon], selected)).toEqual([]);

    // After midnight it is still the same carnival day
    const night = at(AUBADE_MATINALE_ID.id, '2026-02-16T01:00');
    expect(evaluateEasterEggs(night, [morning, afternoon], selected)).toEqual([]);
  });

  it('counts Les marins, Le postillon and Pas de charge per day', () => {
    const marins = [1, 2, 3].map((i) => at(MARINS_ID.id, `2026-02-15T1${i}:00`));
    expect(ids(evaluateEasterEggs(at(MARINS_ID.id, '2026-02-15T14:00'), marins, []))).toEqual(['marins-4']);
    expect(evaluateEasterEggs(at(MARINS_ID.id, '2026-02-15T15:00'), [...marins, at(MARINS_ID.id, '2026-02-15T14:00')], [])).toEqual([]);
    expect(evaluateEasterEggs(at(MARINS_ID.id, '2026-02-16T14:00'), marins, [])).toEqual([]);

    const postillon = [1, 2, 3, 4].map((i) => at(POSTILLON_DE_LONGJUMEAU_ID.id, `2026-02-15T1${i}:00`));
    expect(ids(evaluateEasterEggs(at(POSTILLON_DE_LONGJUMEAU_ID.id, '2026-02-15T15:00'), postillon, []))).toEqual(['postillon-5']);

    const charge = [1, 2, 3, 4].map((i) => at(PAS_DE_CHARGE_ID.id, `2026-02-15T1${i}:00`));
    expect(ids(evaluateEasterEggs(at(PAS_DE_CHARGE_ID.id, '2026-02-15T15:00'), charge, []))).toEqual(['pas-de-charge-5']);
    expect(evaluateEasterEggs(at(PAS_DE_CHARGE_ID.id, '2026-02-15T15:00'), charge.slice(0, 3), [])).toEqual([]);
  });

  it('can fire several eggs on one announcement', () => {
    const picks = [AIR_CLASSIQUE_ID.id, AUBADE_MATINALE_ID.id];
    const earlier = [at(AIR_CLASSIQUE_ID.id, '2026-02-15T10:00')];
    const eggs = evaluateEasterEggs(at(AUBADE_MATINALE_ID.id, '2026-02-15T15:00'), earlier, picks);
    expect(ids(eggs)).toEqual(['premier-carnet', 'aubade-tardive']);
  });
});
