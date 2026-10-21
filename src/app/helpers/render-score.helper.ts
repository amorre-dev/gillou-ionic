import { Renderer as VFRenderer, Stave, Formatter, Voice } from 'vexflow';
import { Score } from '../types/score.type';
import { Measure } from '../types/measure.type';

const STAVE_HEIGHT = 120;
const LEFT_MARGIN = 4;
const RIGHT_MARGIN = 4;
/** Space kept around the drawn content when cropping the canvas. */
const CROP_PADDING = 3;


/**
 * Renders a score as an SVG string sized for the given width.
 * Colours are not baked in: music-display.component.scss colours the `vf-*` groups
 * from the theme tokens, so the same SVG serves both themes.
 */
export function renderScore(score: Score, screenWidth: number): string {
  const availableWidth = screenWidth - LEFT_MARGIN - RIGHT_MARGIN;
  const keyWidth = calculateKeyWidth(score.keySignature);
  const staveWidths = calculateWidths(score.measures, availableWidth - keyWidth);
  staveWidths[0] += keyWidth;

  // Rendered inside the document (off-screen) so the drawn bounds can be measured for cropping.
  const host = document.createElement('div');
  host.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none;';
  document.body.appendChild(host);
  const div = document.createElement('div');
  host.appendChild(div);
  const renderer = new VFRenderer(div, VFRenderer.Backends.SVG);
  renderer.resize(screenWidth, STAVE_HEIGHT);
  const context = renderer.getContext();

  const [beatsPerMeasure, beatValue] = score.timeSignature
    .split('/')
    .map((part) => parseInt(part, 10));

  let x = LEFT_MARGIN;
  const y = 0;

  score.measures.forEach((measure, index) => {
    const staveWidth = staveWidths[index];
    const stave = new Stave(x, y, staveWidth);

    if (index === 0) {
      stave
        .addClef(score.clef)
        .addTimeSignature(score.timeSignature)
        .addKeySignature(score.keySignature);
    }

    stave.setContext(context).draw();

    const voice = new Voice({
      num_beats: beatsPerMeasure,
      beat_value: beatValue,
    });
    voice.addTickables(measure.notes);

    new Formatter().joinVoices([voice]).formatToStave([voice], stave);
    voice.draw(context, stave);

    measure.beams?.forEach((beam) => beam.setContext(context).draw());
    measure.ties?.forEach((tie) => tie.setContext(context).draw());

    x += staveWidth;
  });

  cropToContent(div.querySelector('svg'), screenWidth);
  const svg = div.innerHTML;
  host.remove();
  return svg;
}

/**
 * VexFlow draws on a fixed-height canvas with empty bands above and below the stave.
 * Trim the viewBox to what was actually drawn so cards stay as short as possible.
 */
function cropToContent(svg: SVGSVGElement | null, width: number) {
  if (!svg || typeof svg.getBBox !== 'function') {
    return;
  }
  const box = svg.getBBox();
  if (!(box.height > 0)) {
    return;
  }
  const top = Math.max(0, Math.floor(box.y) - CROP_PADDING);
  const height = Math.ceil(box.y + box.height) + CROP_PADDING - top;
  svg.setAttribute('viewBox', `0 ${top} ${width} ${height}`);
  svg.setAttribute('height', String(height));
  svg.style.height = `${height}px`;
}

/** Horizontal room taken by clef, time signature and key signature on the first stave. */
function calculateKeyWidth(keySignature: string): number {
  switch (keySignature) {
    case 'C':
      return 50;
    case 'D':
    case 'Bb':
      return 80;
    default:
      return 70;
  }
}

/** Splits the available width between measures proportionally to their weight. */
function calculateWidths(measures: Measure[], availableWidth: number): number[] {
  const totalWeight = measures.reduce((sum, measure) => sum + measure.weight, 0);
  const unitWidth = availableWidth / totalWeight;
  return measures.map((measure) => unitWidth * measure.weight);
}
