import { TestBed } from '@angular/core/testing';
import { ScoreRenderedCacheService } from './score-rendered-cache.service';
import { ScoreService } from './score.service';
import { SCORE_REGISTRY } from '../data/score.registery';
import { renderScore } from '../helpers/render-score.helper';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

/** VexFlow gives every element a fresh auto id, so strip them before comparing two renders. */
const withoutIds = (svg: string) => svg.replace(/ id="vf-auto\d+"/g, '');

describe('ScoreRenderedCacheService', () => {
  let service: ScoreRenderedCacheService;

  beforeEach(() => {
    resetPersistenceForTests();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreRenderedCacheService);
  });

  it('returns the same SVG for the same width and a different one for another width', () => {
    const score = SCORE_REGISTRY[0].getScore('sib');
    const first = service.getOrRender(score, 400);

    expect(first).toContain('<svg');
    expect(service.getOrRender(score, 400)).toBe(first);
    expect(withoutIds(service.getOrRender(score, 800))).not.toEqual(withoutIds(first));
  });

  it('bakes no theme colours into the SVG (the theme is applied by CSS)', () => {
    const svg = service.getOrRender(SCORE_REGISTRY[0].getScore('sib'), 400);
    const root = document.documentElement;
    for (const token of ['--gillou-music-ink', '--gillou-stave-line']) {
      const value = getComputedStyle(root).getPropertyValue(token).trim();
      expect(value).not.toBe('');
      expect(svg.toLowerCase()).not.toContain(value.toLowerCase());
    }
  });

  it('renders identically after a width change (rotation), despite VexFlow mutating notes', () => {
    const entry = SCORE_REGISTRY.find((e) => e.id === 'lion-de-belgique')!;
    const score = entry.getScore('sib');
    service.getOrRender(score, 800); // first render mutates stems/beams of this instance
    const rotated = service.getOrRender(score, 360);
    const fresh = renderScore(entry.getScore('sib'), 360);
    expect(withoutIds(rotated)).toEqual(withoutIds(fresh));
  });

  it('pre-renders the scores of the current tone', async () => {
    TestBed.inject(ScoreService).setTone('mib');
    await service.initCache();

    const score = SCORE_REGISTRY[3].getScore('mib');
    expect(withoutIds(service.getOrRender(score, 360))).toEqual(
      withoutIds(renderScore(score, 360))
    );
  });
});
