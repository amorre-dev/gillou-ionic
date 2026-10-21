import { ScoreHistory } from '../types/score-history.type';

/**
 * A carnival day runs from the morning until well past midnight, so anything
 * announced before this hour still belongs to the previous day.
 */
export const DAY_CUTOFF_HOUR = 5;

export interface CarnivalDay {
  /** Local calendar day key, YYYY-MM-DD. */
  day: string;
  /** Noon of that day as ISO, convenient for the date pipe. */
  date: string;
  entries: ScoreHistory[];
}

const pad = (n: number) => String(n).padStart(2, '0');

/** The carnival day (YYYY-MM-DD, local time) an entry belongs to. */
export function carnivalDayOf(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return 'unknown';
  }
  date.setHours(date.getHours() - DAY_CUTOFF_HOUR);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function noonOf(day: string): string {
  const [y, m, d] = day.split('-').map(Number);
  return Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d)
    ? new Date(y, m - 1, d, 12).toISOString()
    : day;
}

/**
 * Groups entries by carnival day. Days and the entries inside them follow `order`
 * ('asc' = oldest first, 'desc' = newest first).
 */
export function groupByCarnivalDay(
  entries: readonly ScoreHistory[],
  order: 'asc' | 'desc' = 'asc'
): CarnivalDay[] {
  const byDay = new Map<string, ScoreHistory[]>();
  for (const entry of entries) {
    const day = carnivalDayOf(entry.date);
    byDay.set(day, [...(byDay.get(day) ?? []), entry]);
  }
  const days = [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, dayEntries]) => ({
      day,
      date: noonOf(day),
      entries: [...dayEntries].sort((a, b) => a.date.localeCompare(b.date)),
    }));
  if (order === 'desc') {
    days.reverse();
    days.forEach((d) => d.entries.reverse());
  }
  return days;
}

/** First and last carnival day covered by the entries (noon ISO strings), or null when empty. */
export function carnivalDateRange(
  entries: readonly ScoreHistory[]
): { from: string; to: string; dayCount: number } | null {
  const days = groupByCarnivalDay(entries);
  if (days.length === 0) {
    return null;
  }
  return { from: days[0].date, to: days[days.length - 1].date, dayCount: days.length };
}

/** Number of announcements per score, sorted by score number. */
export function countByScore(
  entries: readonly ScoreHistory[]
): { scoreId: string; scoreTitle: string; scoreNumber: number; count: number }[] {
  const counts = new Map<string, { scoreId: string; scoreTitle: string; scoreNumber: number; count: number }>();
  for (const entry of entries) {
    const current = counts.get(entry.scoreId);
    if (current) {
      current.count += 1;
    } else {
      counts.set(entry.scoreId, {
        scoreId: entry.scoreId,
        scoreTitle: entry.scoreTitle,
        scoreNumber: entry.scoreNumber,
        count: 1,
      });
    }
  }
  return [...counts.values()].sort((a, b) => a.scoreNumber - b.scoreNumber);
}
