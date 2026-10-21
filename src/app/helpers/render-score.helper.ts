import { Renderer as VFRenderer, Stave, Formatter, Voice } from 'vexflow';
import { Score } from '../types/score.type';
import { Measure } from '../types/measure.type';

const STAVE_HEIGHT = 120;
const LEFT_MARGIN = 10;
const RIGHT_MARGIN = 10;

/** Renders a score as an SVG string sized for the given screen width. */
export function renderScore(
  score: Score,
  screenWidth: number,
  isDarkMode: boolean
): string {
  const availableWidth = screenWidth - LEFT_MARGIN - RIGHT_MARGIN;
  const keyWidth = calculateKeyWidth(score.keySignature);
  const staveWidths = calculateWidths(score.measures, availableWidth - keyWidth);
  staveWidths[0] += keyWidth;

  const div = document.createElement('div');
  const renderer = new VFRenderer(div, VFRenderer.Backends.SVG);
  renderer.resize(screenWidth, STAVE_HEIGHT);
  const context = renderer.getContext();

  if (isDarkMode) {
    context.setStrokeStyle('#ffffff');
    context.setFillStyle('#ffffff');
  }

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

  return div.innerHTML;
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
