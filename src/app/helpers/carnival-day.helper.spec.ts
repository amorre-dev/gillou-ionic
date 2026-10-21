import {
  carnivalDateRange,
  carnivalDayOf,
  countByScore,
  groupByCarnivalDay,
} from './carnival-day.helper';
import { ScoreHistory } from '../types/score-history.type';

const entry = (id: string, local: string, scoreId = 'doudou', scoreNumber = 19): ScoreHistory => ({
  historyId: id,
  scoreId,
  scoreTitle: scoreId,
  scoreNumber,
  date: new Date(local).toISOString(), // local time, like the app records it
});

describe('carnival day helpers', () => {
  it('counts the small hours as part of the previous day', () => {
    expect(carnivalDayOf(new Date('2026-02-15T23:50:00').toISOString())).toBe('2026-02-15');
    expect(carnivalDayOf(new Date('2026-02-16T00:40:00').toISOString())).toBe('2026-02-15');
    expect(carnivalDayOf(new Date('2026-02-16T04:59:00').toISOString())).toBe('2026-02-15');
    expect(carnivalDayOf(new Date('2026-02-16T05:00:00').toISOString())).toBe('2026-02-16');
    expect(carnivalDayOf('not a date')).toBe('unknown');
  });

  it('groups by carnival day in both orders', () => {
    const entries = [
      entry('a', '2026-02-15T10:00:00'),
      entry('b', '2026-02-16T00:30:00'),
      entry('c', '2026-02-16T11:00:00'),
      entry('d', '2026-02-17T09:00:00'),
    ];
    const asc = groupByCarnivalDay(entries);
    expect(asc.map((d) => d.day)).toEqual(['2026-02-15', '2026-02-16', '2026-02-17']);
    expect(asc[0].entries.map((e) => e.historyId)).toEqual(['a', 'b']);

    const desc = groupByCarnivalDay(entries, 'desc');
    expect(desc.map((d) => d.day)).toEqual(['2026-02-17', '2026-02-16', '2026-02-15']);
    expect(desc[2].entries.map((e) => e.historyId)).toEqual(['b', 'a']);

    expect(carnivalDateRange(entries)?.dayCount).toBe(3);
    expect(carnivalDateRange([])).toBeNull();
  });

  it('summarises counts per score ordered by number', () => {
    const rows = countByScore([
      entry('a', '2026-02-15T10:00:00', 'doudou', 19),
      entry('b', '2026-02-15T10:05:00', 'classe', 12),
      entry('c', '2026-02-15T10:10:00', 'doudou', 19),
    ]);
    expect(rows.map((r) => [r.scoreNumber, r.count])).toEqual([
      [12, 1],
      [19, 2],
    ]);
  });
});
