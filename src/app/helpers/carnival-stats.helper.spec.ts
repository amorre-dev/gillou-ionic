import { buildCarnivalStats, rankScores, statsToText } from './carnival-stats.helper';
import { ScoreHistory } from '../types/score-history.type';

let n = 0;
const at = (scoreId: string, title: string, number: number, local: string): ScoreHistory => ({
  historyId: 'h' + n++,
  scoreId,
  scoreTitle: title,
  scoreNumber: number,
  date: new Date(local).toISOString(),
});

const entries = [
  at('air', 'Air Classique', 1, '2026-02-15T10:00'),
  at('air', 'Air Classique', 1, '2026-02-15T11:00'),
  at('air', 'Air Classique', 1, '2026-02-16T11:00'),
  at('doudou', 'El doudou', 19, '2026-02-15T12:00'),
  at('classe', 'La classe', 12, '2026-02-16T12:00'),
];

describe('carnival stats', () => {
  it('ranks most and least played, listing ties', () => {
    const ranks = rankScores(entries);
    expect(ranks.total).toBe(5);
    expect(ranks.most).toEqual({ names: ['Air Classique'], count: 3 });
    expect(ranks.least).toEqual({ names: ['La classe', 'El doudou'], count: 1 });
    expect(rankScores([])).toEqual({ total: 0, most: null, least: null });
    expect(rankScores(entries.slice(0, 2)).least).toBeNull();
  });

  it('builds a whole-carnival summary with a French period', () => {
    const stats = buildCarnivalStats('Binche 2026', 'Binche', entries, 'all');
    expect(stats.dayCount).toBe(2);
    expect(stats.period).toBe('du dimanche 15 au lundi 16 février 2026 (2 jours)');
    expect(stats.blocks.length).toBe(1);
    const text = statsToText(stats);
    expect(text).toContain('🎺 Binche 2026 · Binche');
    expect(text).toContain('• 5 annonces jouées');
    expect(text).toContain('Le plus joué : Air Classique (3×)');
    expect(text).toContain('Fait avec Gillou');
  });

  it('splits per day when asked and the carnival spans several days', () => {
    const stats = buildCarnivalStats('Binche 2026', '', entries, 'days');
    expect(stats.mode).toBe('days');
    expect(stats.blocks.map((b) => [b.label, b.total])).toEqual([
      ['Dimanche 15 février', 3],
      ['Lundi 16 février', 2],
    ]);
    const single = buildCarnivalStats('Un jour', '', entries.slice(0, 2), 'days');
    expect(single.mode).toBe('all');
    expect(single.period).toBe('le dimanche 15 février 2026');
  });
});
