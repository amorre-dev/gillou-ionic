import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ScoreHistory } from '../types/score-history.type';
import { countByScore, groupByCarnivalDay } from './carnival-day.helper';

registerLocaleData(localeFr);

export interface ScoreRank {
  names: string[];
  count: number;
}

export interface StatsBlock {
  /** Day label for a per-day block, undefined for the whole carnival. */
  label?: string;
  total: number;
  most: ScoreRank | null;
  least: ScoreRank | null;
}

export interface CarnivalStats {
  name: string;
  location: string;
  /** "du dimanche 15 au mardi 17 février 2026 (3 jours)" or "le dimanche 15 février 2026". */
  period: string;
  dayCount: number;
  /** One block for the whole carnival, or one per day in 'days' mode. */
  blocks: StatsBlock[];
  mode: 'all' | 'days';
}

const fr = (iso: string, pattern: string) => formatDate(iso, pattern, 'fr');
const cap = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Most and least played scores (ties listed together, at most three names each). */
export function rankScores(entries: readonly ScoreHistory[]): Pick<StatsBlock, 'total' | 'most' | 'least'> {
  const rows = countByScore(entries);
  if (rows.length === 0) {
    return { total: 0, most: null, least: null };
  }
  const max = Math.max(...rows.map((r) => r.count));
  const min = Math.min(...rows.map((r) => r.count));
  const names = (count: number) => rows.filter((r) => r.count === count).map((r) => r.scoreTitle).slice(0, 3);
  return {
    total: entries.length,
    most: { names: names(max), count: max },
    least: rows.length > 1 ? { names: names(min), count: min } : null,
  };
}

export function buildCarnivalStats(
  name: string,
  location: string,
  entries: readonly ScoreHistory[],
  mode: 'all' | 'days'
): CarnivalStats {
  const days = groupByCarnivalDay(entries);
  let period = '';
  if (days.length === 1) {
    period = `le ${fr(days[0].date, 'EEEE d MMMM yyyy')}`;
  } else if (days.length > 1) {
    const first = days[0].date;
    const last = days[days.length - 1].date;
    const sameMonth = fr(first, 'MMMM yyyy') === fr(last, 'MMMM yyyy');
    period = `du ${fr(first, sameMonth ? 'EEEE d' : 'EEEE d MMMM')} au ${fr(last, 'EEEE d MMMM yyyy')} (${days.length} jours)`;
  }
  const blocks: StatsBlock[] =
    mode === 'days' && days.length > 1
      ? days.map((d) => ({ label: cap(fr(d.date, 'EEEE d MMMM')), ...rankScores(d.entries) }))
      : [rankScores(entries)];
  return { name, location, period, dayCount: days.length, blocks, mode: blocks.length > 1 ? 'days' : 'all' };
}

const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`;
const rankText = (rank: ScoreRank | null) => (rank ? `${rank.names.join(', ')} (${rank.count}×)` : '—');

/** Plain-text version of the numbers, for apps that accept text. */
export function statsToText(stats: CarnivalStats): string {
  const lines = [`🎺 ${stats.name}${stats.location ? ` · ${stats.location}` : ''}`];
  if (stats.period) {
    lines.push(cap(stats.period));
  }
  lines.push('', 'Mon carnaval en chiffres');
  for (const block of stats.blocks) {
    if (block.label) {
      lines.push('', `${block.label} · ${plural(block.total, 'annonce')}`);
    } else {
      lines.push(`• ${plural(block.total, 'annonce')} jouée${block.total > 1 ? 's' : ''}`);
    }
    const bullet = block.label ? '  ' : '• ';
    if (block.most) {
      lines.push(`${bullet}Le plus joué : ${rankText(block.most)}`);
    }
    if (block.least) {
      lines.push(`${bullet}Le moins joué : ${rankText(block.least)}`);
    }
  }
  lines.push('', 'Fait avec Gillou');
  return lines.join('\n');
}
