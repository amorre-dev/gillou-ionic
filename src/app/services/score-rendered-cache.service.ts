import { Injectable } from '@angular/core';
import { Score } from '../types/score.type';
import { Platform } from '@ionic/angular';
import { ThemeService } from './theme.service';
import { SCORE_REGISTRY } from '../data/score.registery';
import { generateCacheKey } from '../helpers/cache-key.helper';
import { renderScore } from '../helpers/render-score.helper';

@Injectable({
  providedIn: 'root',
})
export class ScoreRenderedCacheService {
  private cache = new Map<string, string>();

  constructor(private themeService: ThemeService, private platform: Platform) {}

  async initCache() {
    const sib = SCORE_REGISTRY.map((s) => s.getScore('sib'));
    const platformWidth = this.platform.width();
    const isDarkMode = this.themeService.isDarkMode();
    for (const score of sib) {
      const cacheKey = generateCacheKey(
        score.id,
        score.keySignature,
        platformWidth,
        isDarkMode
      );

      if (!this.cache.has(cacheKey)) {
        const svg = await renderScore(score, platformWidth, isDarkMode);
        this.cache.set(cacheKey, svg);
      }
    }
  }

  async getOrRender(
    score: Score,
    screenWidth: number,
    isDarkMode: boolean,
    cacheKey: string
  ): Promise<string> {
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Render and cache the SVG if not present
    const svg = await renderScore(score, screenWidth, isDarkMode);
    this.cache.set(cacheKey, svg);
    return svg;
  }
}
