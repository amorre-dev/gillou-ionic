import { ScoreHistory } from '../types/score-history.type';
import {
  AUBADE_MATINALE_ID,
  MARINS_ID,
  PAS_DE_CHARGE_ID,
  POSTILLON_DE_LONGJUMEAU_ID,
} from '../data/identifiers/score-identifiers';
import { carnivalDayOf } from './carnival-day.helper';

export interface EasterEgg {
  id: string;
  message: string;
  /** Label of the single dismiss button. */
  button: string;
}

const MARINS_TRIGGER_COUNT = 4;
const POSTILLON_TRIGGER_COUNT = 5;
const PAS_DE_CHARGE_TRIGGER_COUNT = 5;
/** "Afternoon": from noon until midnight, local clock. */
const AFTERNOON_START_HOUR = 12;

const isAfternoon = (iso: string) => new Date(iso).getHours() >= AFTERNOON_START_HOUR;

/**
 * Easter eggs triggered by an announcement.
 *
 * `entry` is the announcement just added, `earlierToday` the announcements already made
 * on the same carnival day (any order), `selectedScoreIds` the scores currently in the list.
 * Each egg fires exactly on the announcement that satisfies its condition, so it shows
 * once per carnival day without any extra state.
 */
export function evaluateEasterEggs(
  entry: ScoreHistory,
  earlierToday: readonly ScoreHistory[],
  selectedScoreIds: readonly string[]
): EasterEgg[] {
  const eggs: EasterEgg[] = [];
  const day = carnivalDayOf(entry.date);
  const today = earlierToday.filter((e) => carnivalDayOf(e.date) === day);
  const countToday = (scoreId: string) =>
    today.filter((e) => e.scoreId === scoreId).length + (entry.scoreId === scoreId ? 1 : 0);

  // The first full round of the day: every selected score played at least once.
  if (selectedScoreIds.length > 0 && selectedScoreIds.includes(entry.scoreId)) {
    const playedBefore = new Set(today.map((e) => e.scoreId));
    const wasComplete = selectedScoreIds.every((id) => playedBefore.has(id));
    playedBefore.add(entry.scoreId);
    const isComplete = selectedScoreIds.every((id) => playedBefore.has(id));
    if (isComplete && !wasComplete) {
      eggs.push({
        id: 'premier-carnet',
        message: 'Le premier carnet a été fait, les musiciens méritent bien un verre',
        button: 'Santé !',
      });
    }
  }

  // Aubade matinale in the afternoon, once per day.
  if (entry.scoreId === AUBADE_MATINALE_ID.id && isAfternoon(entry.date)) {
    const alreadyToday = today.some(
      (e) => e.scoreId === AUBADE_MATINALE_ID.id && isAfternoon(e.date)
    );
    if (!alreadyToday) {
      eggs.push({
        id: 'aubade-tardive',
        message: "ce n'était pas vraiment le moment de jouer ça...",
        button: 'Oups',
      });
    }
  }

  if (entry.scoreId === MARINS_ID.id && countToday(MARINS_ID.id) === MARINS_TRIGGER_COUNT) {
    eggs.push({
      id: 'marins-4',
      message: 'CLAUDY, va te faire enculer !',
      button: 'Désolé Claudy',
    });
  }

  if (
    entry.scoreId === POSTILLON_DE_LONGJUMEAU_ID.id &&
    countToday(POSTILLON_DE_LONGJUMEAU_ID.id) === POSTILLON_TRIGGER_COUNT
  ) {
    eggs.push({ id: 'postillon-5', message: 'Bien les Buuuks', button: 'Buuuks !' });
  }

  if (
    entry.scoreId === PAS_DE_CHARGE_ID.id &&
    countToday(PAS_DE_CHARGE_ID.id) === PAS_DE_CHARGE_TRIGGER_COUNT
  ) {
    eggs.push({
      id: 'pas-de-charge-5',
      message: "Claudy, ça c'est une tournée d'Orval.",
      button: 'Santé Claudy !',
    });
  }

  return eggs;
}
