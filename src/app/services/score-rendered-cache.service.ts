import { inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Score } from '../types/score.type';
import { ThemeService } from './theme.service';
import { ScoreService } from './score.service';
import { generateCacheKey } from '../helpers/cache-key.helper';
import { renderScore } from '../helpers/render-score.helper';

@Injectable({
  providedIn: 'root',
})
export class ScoreRenderedCacheService {
  private readonly themeService = inject(ThemeService);
  private readonly scoreService = inject(ScoreService);
  private readonly platform = inject(Platform);

  private readonly cache = new Map<string, string>();

  /**
   * Pre-renders the scores the list page is about to show (current tone, order and theme),
   * yielding to the event loop between scores so the UI stays responsive.
   */
  async initCache(): Promise<void> {
    const screenWidth = this.platform.width();
    const isDarkMode = this.themeService.isDarkMode();

    for (const score of this.scoreService.scores()) {
      const cacheKey = generateCacheKey(
        score.id,
        score.keySignature,
        screenWidth,
        isDarkMode
      );
      if (!this.cache.has(cacheKey)) {
        this.cache.set(cacheKey, renderScore(score, screenWidth, isDarkMode));
        await new Promise<void>((resolve) => setTimeout(resolve));
      }
    }
  }

  getOrRender(score: Score, screenWidth: number, isDarkMode: boolean): string {
    const cacheKey = generateCacheKey(
      score.id,
      score.keySignature,
      screenWidth,
      isDarkMode
    );
    let svg = this.cache.get(cacheKey);
    if (svg === undefined) {
      svg = renderScore(score, screenWidth, isDarkMode);
      this.cache.set(cacheKey, svg);
    }
    return svg;
  }
}
