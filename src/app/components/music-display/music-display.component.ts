import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Score } from '../../types/score.type';
import { ThemeService } from '../../services/theme.service';
import { ScoreRenderedCacheService } from 'src/app/services/score-rendered-cache.service';
import { generateCacheKey } from 'src/app/helpers/cache-key.helper';

@Component({
  selector: 'app-music-display',
  standalone: true,
  template: ` <div #musicCanvas></div> `,
  styleUrls: ['./music-display.component.scss'],
})
export class MusicDisplayComponent implements OnChanges, AfterViewInit {
  @ViewChild('musicCanvas', { static: false }) musicCanvas!: ElementRef;
  @Input() score!: Score;

  constructor(
    private themeService: ThemeService,
    private platform: Platform,
    private scoreCacheService: ScoreRenderedCacheService
  ) {}

  ngAfterViewInit() {
    this.renderOrUseCache();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['score'] && !changes['score'].firstChange) {
      this.renderOrUseCache();
    }
  }

  private async renderOrUseCache() {
    if (!this.score) {
      console.error('Score is not defined!');
      return;
    }
    const platformWidth = this.platform.width();
    const isDarkMode = this.themeService.isDarkMode();
    const cacheKey = generateCacheKey(
      this.score.id,
      this.score.keySignature,
      platformWidth,
      isDarkMode
    );

    // Fetch SVG from cache or render it via the service
    const svg = await this.scoreCacheService.getOrRender(
      this.score,
      platformWidth,
      isDarkMode,
      cacheKey
    );

    // Display the SVG in the canvas
    this.musicCanvas.nativeElement.innerHTML = svg;
  }
}
