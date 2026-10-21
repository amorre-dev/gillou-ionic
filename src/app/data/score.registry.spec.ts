import { SCORE_REGISTRY } from './score.registery';
import { renderScore } from '../helpers/render-score.helper';

/**
 * Renders every score in both tones. VexFlow throws when a measure holds more or
 * fewer ticks than its time signature, so this catches data entry mistakes in the sheets.
 */
describe('SCORE_REGISTRY', () => {
  it('has unique ids and consecutive numbers', () => {
    const ids = SCORE_REGISTRY.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(SCORE_REGISTRY.map((s) => s.number)).toEqual(
      SCORE_REGISTRY.map((_, i) => i + 1)
    );
  });

  for (const tone of ['sib', 'mib'] as const) {
    for (const entry of SCORE_REGISTRY) {
      it(`renders "${entry.title}" in ${tone}`, () => {
        const score = entry.getScore(tone);
        expect(score.id).toBe(entry.id);
        expect(score.measures.length).toBeGreaterThan(0);
        for (const width of [360, 412, 800]) {
          const svg = renderScore(score, width);
          expect(svg).toContain('<svg');
        }
      });
    }
  }
});
