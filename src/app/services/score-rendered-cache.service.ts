import { inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Score } from '../types/score.type';
import { ScoreService } from './score.service';
import { generateCacheKey } from '../helpers/cache-key.helper';
import { renderScore } from '../helpers/render-score.helper';
import { scoreSheetWidth } from '../helpers/layout.helper';
import { SCORE_REGISTRY } from '../data/score.registery';

/**
 * Rendered SVGs per score and width. Theme colours are applied by CSS, so one render serves both themes.
 *
 * VexFlow mutates notes while formatting and beaming (stem lengths accumulate), so a Score instance
 * must never be rendered twice: every miss renders a freshly built copy of the score.
 */
@Injectable({
  providedIn: 'root',
})
export class ScoreRenderedCacheService {
  private readonly scoreService = inject(ScoreService);
  private readonly platform = inject(Platform);

  private readonly cache = new Map<string, string>();

  /**
   * Pre-renders the scores the list page is about to show (current tone and order),
   * yielding to the event loop between scores so the UI stays responsive.
   */
  async initCache(): Promise<void> {
    const width = scoreSheetWidth(this.platform.width());

    for (const score of this.scoreService.scores()) {
      const cacheKey = generateCacheKey(score.id, score.keySignature, width);
      if (!this.cache.has(cacheKey)) {
        this.cache.set(cacheKey, renderScore(freshCopy(score), width));
        await new Promise<void>((resolve) => setTimeout(resolve));
      }
    }
  }

  getOrRender(score: Score, width: number): string {
    const cacheKey = generateCacheKey(score.id, score.keySignature, width);
    let svg = this.cache.get(cacheKey);
    if (svg === undefined) {
      svg = renderScore(freshCopy(score), width);
      this.cache.set(cacheKey, svg);
    }
    return svg;
  }
}

/** A brand-new instance of the same score (new VexFlow note objects), or the score itself if unknown. */
function freshCopy(score: Score): Score {
  const entry = SCORE_REGISTRY.find((e) => e.id === score.id);
  return entry ? entry.getScore(score.tone) : score;
}
