import { CarnivalStats, StatsBlock } from './carnival-stats.helper';
import { LIGHT_THEME } from './theme-colors';

/**
 * Draws "Mon carnaval en chiffres" as a 1080×1350 PNG (a portrait social-post format).
 * Colours are the light theme tokens (theme-colors.ts mirrors variables.scss): the image is
 * the same in both app themes, so they are not read from the current DOM palette.
 */
const W = 1080;
/** Minimum height (4:5 portrait); the card grows when long titles or ties need more room. */
const MIN_H = 1350;
const FOOTER_H = 170;
const C = {
  bg: LIGHT_THEME.bgMain,
  band: LIGHT_THEME.accent,
  onBand: LIGHT_THEME.onAccent,
  card: LIGHT_THEME.surface,
  border: LIGHT_THEME.outline,
  ink: LIGHT_THEME.ink,
  muted: LIGHT_THEME.inkMuted,
  tonal: LIGHT_THEME.tonal,
  brand: LIGHT_THEME.brand,
};
const FONT = 'Nunito, "Segoe UI", Roboto, sans-serif';

export async function renderStatsCard(stats: CarnivalStats, logoUrl = 'assets/icon/gillou.png'): Promise<Blob> {
  await loadFonts();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D unavailable');
  }

  // Measure first so the canvas can grow with long titles and ties.
  const bandH = 330;
  const compact = stats.blocks.length > 1;
  const layouts = stats.blocks.map((block) => layoutBlock(ctx, block, compact));
  const blocksH = layouts.reduce((sum, l) => sum + l.height, 0) + (layouts.length - 1) * (compact ? 18 : 36);
  const H = Math.max(MIN_H, bandH + 56 + blocksH + 40 + FOOTER_H);
  canvas.width = W;
  canvas.height = H;

  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);

  // Accent band with the carnival identity
  ctx.fillStyle = C.band;
  roundRect(ctx, 0, 0, W, bandH, [0, 0, 56, 56]);
  ctx.fill();
  ctx.fillStyle = C.onBand;
  ctx.font = `800 40px ${FONT}`;
  ctx.fillText('MON CARNAVAL EN CHIFFRES', 72, 96);
  ctx.font = `800 64px ${FONT}`;
  let y = 180;
  for (const line of wrap(ctx, stats.name, W - 144, 2)) {
    ctx.fillText(line, 72, y);
    y += 72;
  }
  ctx.font = `600 34px ${FONT}`;
  const sub = [stats.location, stats.period ? cap(stats.period) : ''].filter(Boolean).join('  ·  ');
  for (const line of wrap(ctx, sub, W - 144, 2)) {
    ctx.fillText(line, 72, y);
    y += 44;
  }

  // Blocks
  y = bandH + 56;
  for (const layout of layouts) {
    drawBlock(ctx, layout, y);
    y += layout.height + (compact ? 18 : 36);
  }

  // Footer with logo
  const logo = await loadImage(logoUrl).catch(() => null);
  const footerY = H - 110;
  let textX = 72;
  if (logo) {
    const h = 96;
    const w = Math.round((h * logo.naturalWidth) / logo.naturalHeight);
    ctx.drawImage(logo, 72, footerY - 48, w, h);
    textX = 72 + w + 24;
  }
  ctx.fillStyle = C.muted;
  ctx.font = `700 32px ${FONT}`;
  ctx.fillText('Fait avec Gillou · par am-e.dev', textX, footerY + 12);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG export failed'))), 'image/png')
  );
}

interface RankLayout {
  label: string;
  /** One entry per score; a long title may wrap onto several lines. */
  lines: string[];
  count: number;
}

interface BlockLayout {
  block: StatsBlock;
  compact: boolean;
  ranks: RankLayout[];
  height: number;
}

const GEOMETRY = {
  full: { pad: 40, headH: 0, bigH: 170, labelH: 40, lineH: 54, rankGap: 18, nameFont: `800 44px ${FONT}`, labelFont: `700 30px ${FONT}` },
  compact: { pad: 24, headH: 58, bigH: 0, labelH: 32, lineH: 44, rankGap: 12, nameFont: `800 34px ${FONT}`, labelFont: `700 26px ${FONT}` },
};

function layoutBlock(ctx: CanvasRenderingContext2D, block: StatsBlock, compact: boolean): BlockLayout {
  const g = compact ? GEOMETRY.compact : GEOMETRY.full;
  const maxW = W - 144 - g.pad * 2 - 170; // room for the count pill on the right
  ctx.font = g.nameFont;
  const ranks: RankLayout[] = [];
  const add = (label: string, rank: StatsBlock['most']) => {
    if (rank) {
      ranks.push({ label, count: rank.count, lines: rank.names.flatMap((name) => wrap(ctx, name, maxW, 3)) });
    }
  };
  add('Le plus joué', block.most);
  add('Le moins joué', block.least);
  const ranksH = ranks.reduce((sum, r) => sum + g.labelH + r.lines.length * g.lineH + g.rankGap, 0);
  const headH = block.label ? g.headH : 0;
  return { block, compact, ranks, height: g.pad + headH + g.bigH + ranksH + g.pad - g.rankGap };
}

function drawBlock(ctx: CanvasRenderingContext2D, layout: BlockLayout, top: number) {
  const { block, compact, ranks } = layout;
  const g = compact ? GEOMETRY.compact : GEOMETRY.full;
  const x = 72;
  const w = W - 144;

  ctx.fillStyle = C.card;
  ctx.strokeStyle = C.border;
  ctx.lineWidth = 2;
  roundRect(ctx, x, top, w, layout.height, 40);
  ctx.fill();
  ctx.stroke();

  let y = top + g.pad;
  if (block.label) {
    ctx.fillStyle = C.ink;
    ctx.font = `800 40px ${FONT}`;
    ctx.fillText(block.label, x + g.pad, y + 34);
    pill(ctx, `${block.total} annonce${block.total > 1 ? 's' : ''}`, x + w - g.pad, y - 2, true);
    y += g.headH;
  }
  if (!compact) {
    ctx.fillStyle = C.ink;
    ctx.font = `800 128px ${FONT}`;
    ctx.fillText(String(block.total), x + g.pad, y + 118);
    const numW = ctx.measureText(String(block.total)).width;
    ctx.fillStyle = C.muted;
    ctx.font = `700 40px ${FONT}`;
    ctx.fillText(`annonce${block.total > 1 ? 's' : ''} jouée${block.total > 1 ? 's' : ''}`, x + g.pad + numW + 24, y + 112);
    y += g.bigH;
  }
  for (const rank of ranks) {
    ctx.fillStyle = C.muted;
    ctx.font = g.labelFont;
    ctx.fillText(rank.label.toUpperCase(), x + g.pad, y + g.labelH - 8);
    pill(ctx, `${rank.count}×`, x + w - g.pad, y + g.labelH - 10, false);
    y += g.labelH;
    ctx.fillStyle = C.ink;
    ctx.font = g.nameFont;
    for (const line of rank.lines) {
      ctx.fillText(line, x + g.pad, y + g.lineH - 14);
      y += g.lineH;
    }
    y += g.rankGap;
  }
}

function pill(ctx: CanvasRenderingContext2D, text: string, right: number, top: number, soft: boolean) {
  ctx.font = `800 34px ${FONT}`;
  const tw = ctx.measureText(text).width;
  const pw = tw + 48;
  const ph = 56;
  ctx.fillStyle = soft ? C.tonal : C.band;
  roundRect(ctx, right - pw, top, pw, ph, ph / 2);
  ctx.fill();
  ctx.fillStyle = C.onBand;
  ctx.fillText(text, right - pw + 24, top + 39);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | number[]) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.closePath();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxW || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) {
    lines.push(line);
  }
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = ellipsis(ctx, kept[maxLines - 1] + ' ' + lines.slice(maxLines).join(' '), maxW);
    return kept;
  }
  return lines;
}

function ellipsis(ctx: CanvasRenderingContext2D, text: string, maxW: number): string {
  if (ctx.measureText(text).width <= maxW) {
    return text;
  }
  let cut = text;
  while (cut.length > 1 && ctx.measureText(cut + '…').width > maxW) {
    cut = cut.slice(0, -1);
  }
  return cut.trimEnd() + '…';
}

const cap = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

async function loadFonts() {
  if (!('fonts' in document)) {
    return;
  }
  await Promise.all(
    ['800 64px Nunito', '700 40px Nunito', '600 34px Nunito'].map((f) => document.fonts.load(f).catch(() => []))
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Cannot load ${src}`));
    img.src = src;
  });
}
