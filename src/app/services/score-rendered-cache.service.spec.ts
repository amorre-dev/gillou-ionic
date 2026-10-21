import { TestBed } from '@angular/core/testing';
import { ScoreRenderedCacheService } from './score-rendered-cache.service';
import { ScoreService } from './score.service';
import { SCORE_REGISTRY } from '../data/score.registery';
import { renderScore } from '../helpers/render-score.helper';

/** VexFlow gives every element a fresh auto id, so strip them before comparing two renders. */
const withoutIds = (svg: string) => svg.replace(/ id="vf-auto\d+"/g, '');

describe('ScoreRenderedCacheService', () => {
  let service: ScoreRenderedCacheService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreRenderedCacheService);
  });

  it('returns the rendered SVG, distinct per theme and width', () => {
    const score = SCORE_REGISTRY[0].getScore('sib');
    const light = service.getOrRender(score, 400, false);

    expect(light).toContain('<svg');
    expect(service.getOrRender(score, 400, false)).toBe(light);
    expect(withoutIds(service.getOrRender(score, 400, true))).not.toEqual(withoutIds(light));
    expect(withoutIds(service.getOrRender(score, 800, false))).not.toEqual(withoutIds(light));
  });

  it('pre-renders the scores of the current tone', async () => {
    TestBed.inject(ScoreService).setTone('mib');
    await service.initCache();

    const width = TestBed.inject(ScoreService).scores().length;
    expect(width).toBe(SCORE_REGISTRY.length);
    const score = SCORE_REGISTRY[3].getScore('mib');
    expect(withoutIds(service.getOrRender(score, 360, false))).toEqual(
      withoutIds(renderScore(score, 360, false))
    );
  });
});
