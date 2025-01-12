import { Renderer as VFRenderer, Stave, Formatter, Voice } from 'vexflow';
import { Score } from '../types/score.type';

export async function renderScore(
  score: Score,
  screenWidth: number,
  isDarkMode: boolean
): Promise<string> {
  const availableWidth = screenWidth - 20;
  const staveHeight = 120;
  const keyWidth = calculateKeyWidth(score.keySignature);
  const staveWidths = calculateWidths(
    score.measures,
    availableWidth - keyWidth
  );
  staveWidths[0] += keyWidth;

  const div = document.createElement('div');
  const renderer = new VFRenderer(div, VFRenderer.Backends.SVG);
  renderer.resize(screenWidth, staveHeight);
  const context = renderer.getContext();

  if (isDarkMode) {
    context.setStrokeStyle('#ffffff');
    context.setFillStyle('#ffffff');
  }

  let x = 10;
  const y = 0;

  score.measures.forEach((measure, index) => {
    const staveWidth = staveWidths[index];
    const stave = new Stave(x, y, staveWidth);

    if (index === 0) {
      stave
        .addClef('treble')
        .addTimeSignature(score.timeSignature)
        .addKeySignature(score.keySignature);
    }

    stave.setContext(context).draw();

    const voice = new Voice({
      num_beats: parseInt(score.timeSignature.split('/')[0]),
      beat_value: parseInt(score.timeSignature.split('/')[1]),
    });
    voice.addTickables(measure.notes);

    const formatter = new Formatter();
    formatter.joinVoices([voice]).formatToStave([voice], stave);

    voice.draw(context, stave);

    if (measure.beams) {
      measure.beams.forEach((beam) => beam.setContext(context).draw());
    }

    if (measure.ties) {
      measure.ties.forEach((ties) => ties.setContext(context).draw());
    }

    x += staveWidth;
  });

  return div.innerHTML; // Return rendered SVG as string
}

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

function calculateWidths(measures: any[], availableWidth: number): number[] {
  const weights = measures.reduce((sum, measure) => sum + measure.weight, 0);
  const noteWidth = availableWidth / weights;

  return measures.map((measure) => noteWidth * measure.weight);
}
