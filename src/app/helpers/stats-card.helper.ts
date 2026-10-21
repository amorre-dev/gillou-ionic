import { CarnivalStats, StatsBlock } from './carnival-stats.helper';

/**
 * Draws "Mon carnaval en chiffres" as a 1080×1350 PNG (a portrait social-post format).
 * Colours mirror the light theme tokens; the image is the same in both app themes.
 */
const W = 1080;
const H = 1350;
const C = {
  bg: '#fff6ee',
  band: '#e9a262',
  onBand: '#3b2312',
  card: '#ffffff',
  border: '#f0d6bc',
  ink: '#5a3519',
  muted: '#8a6545',
  tonal: '#fae8d8',
  brand: '#e8892a',
};
const FONT = 'Nunito, "Segoe UI", Roboto, sans-serif';

export async function renderStatsCard(stats: CarnivalStats, logoUrl = 'assets/icon/gillou.png'): Promise<Blob> {
  await loadFonts();
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D unavailable');
  }

  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);

  // Accent band with the carnival identity
  const bandH = 330;
  ctx.fillStyle = C.band;
  roundRect(ctx, 0, 0, W, bandH, [0, 0, 56, 56]);
  ctx.fill();
  ctx.fillStyle = C.onBand;
  ctx.font = `800 40px ${FONT}`;
  ctx.fillText('MON CARNAVAL EN CHIFFRES', 72, 96);
  ctx.font = `800 64px ${FONT}`;
  const nameLines = wrap(ctx, stats.name, W - 144, 2);
  let y = 180;
  for (const line of nameLines) {
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
  const compact = stats.blocks.length > 1;
  for (const block of stats.blocks) {
    y = drawBlock(ctx, block, y, compact);
    y += compact ? 18 : 36;
    if (y > H - 190) {
      break; // more days than fit: the text version still lists them all
    }
  }

  // Footer with logo
  const logo = await loadImage(logoUrl).catch(() => null);
  const footerY = H - 110;
  if (logo) {
    ctx.drawImage(logo, 72, footerY - 44, 88, 88);
  }
  ctx.fillStyle = C.muted;
  ctx.font = `700 32px ${FONT}`;
  ctx.fillText('Fait avec Gillou · annonces du carnaval', logo ? 184 : 72, footerY + 12);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG export failed'))), 'image/png')
  );
}

function drawBlock(ctx: CanvasRenderingContext2D, block: StatsBlock, top: number, compact: boolean): number {
  const x = 72;
  const w = W - 144;
  const pad = compact ? 24 : 40;
  const rowH = compact ? 72 : 110;
  const headH = block.label ? 58 : 0;
  const bigH = compact ? 0 : 170;
  const rows = [block.most, block.least].filter(Boolean).length;
  const h = pad + headH + bigH + rows * rowH + (compact ? 10 : pad);

  ctx.fillStyle = C.card;
  ctx.strokeStyle = C.border;
  ctx.lineWidth = 2;
  roundRect(ctx, x, top, w, h, 40);
  ctx.fill();
  ctx.stroke();

  let y = top + pad;
  if (block.label) {
    ctx.fillStyle = C.ink;
    ctx.font = `800 40px ${FONT}`;
    ctx.fillText(block.label, x + pad, y + 34);
    pill(ctx, `${block.total} annonce${block.total > 1 ? 's' : ''}`, x + w - pad, y - 2, true);
    y += headH;
  }
  if (!compact) {
    ctx.fillStyle = C.ink;
    ctx.font = `800 128px ${FONT}`;
    ctx.fillText(String(block.total), x + pad, y + 118);
    const numW = ctx.measureText(String(block.total)).width;
    ctx.fillStyle = C.muted;
    ctx.font = `700 40px ${FONT}`;
    ctx.fillText(`annonce${block.total > 1 ? 's' : ''} jouée${block.total > 1 ? 's' : ''}`, x + pad + numW + 24, y + 112);
    y += bigH;
  }
  const row = (label: string, names: string[], count: number) => {
    ctx.fillStyle = C.muted;
    ctx.font = `700 ${compact ? 26 : 30}px ${FONT}`;
    ctx.fillText(label.toUpperCase(), x + pad, y + (compact ? 22 : 30));
    ctx.fillStyle = C.ink;
    ctx.font = `800 ${compact ? 34 : 44}px ${FONT}`;
    const maxW = w - pad * 2 - 200;
    ctx.fillText(ellipsis(ctx, names.join(', '), maxW), x + pad, y + (compact ? 58 : 82));
    pill(ctx, `${count}×`, x + w - pad, y + (compact ? 12 : 34), false);
    y += rowH;
  };
  if (block.most) {
    row('Le plus joué', block.most.names, block.most.count);
  }
  if (block.least) {
    row('Le moins joué', block.least.names, block.least.count);
  }
  return top + h;
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
