import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  effect,
} from '@angular/core';
import { Platform, GestureController } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Score } from '../../types/score.type';
import { ThemeService } from '../../services/theme.service';
import { ScoreRenderedCacheService } from 'src/app/services/score-rendered-cache.service';
import { generateCacheKey } from 'src/app/helpers/cache-key.helper';
import { ScoreHistoryService } from 'src/app/services/score-history.service';

@Component({
  selector: 'app-music-display',
  standalone: true,
  template: ` <div #musicCanvas></div> `,
  styleUrls: ['./music-display.component.scss'],
})
export class MusicDisplayComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @ViewChild('musicCanvas', { static: false }) musicCanvas!: ElementRef;
  @Input() score!: Score;

  isDarkMode = this.themeService.isDarkMode;

  private lastOnStart: number = 0;
  private DOUBLE_CLICK_THRESHOLD: number = 500;

  constructor(
    private themeService: ThemeService,
    private platform: Platform,
    private scoreCacheService: ScoreRenderedCacheService,
    private gestureCtrl: GestureController,
    private historyService: ScoreHistoryService
  ) {
    ScreenOrientation.addListener('screenOrientationChange', () => {
      this.renderOrUseCache(); // Retrigger rendering when orientation changes
    });
    effect(() => {
      this.renderOrUseCache();
    });
  }

  ngAfterViewInit() {
    this.renderOrUseCache();
    const gesture = this.gestureCtrl.create({
      el: this.musicCanvas.nativeElement,
      threshold: 0,
      onStart: () => this.onStart(),
      gestureName: 'double-click',
    });

    gesture.enable();
  }

  private onStart() {
    const now = Date.now();

    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      this.historyService.addToHistory(
        this.score.id,
        this.score.title,
        this.score.number
      );
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['score'] && !changes['score'].firstChange) {
      this.renderOrUseCache();
    }
  }

  ngOnDestroy() {
    ScreenOrientation.removeAllListeners();
  }

  private async renderOrUseCache() {
    if (!this.score) {
      console.error('Score is not defined!');
      return;
    }
    const platformWidth = this.platform.width();
    const cacheKey = generateCacheKey(
      this.score.id,
      this.score.keySignature,
      platformWidth,
      this.isDarkMode()
    );

    // Fetch SVG from cache or render it via the service
    const svg = await this.scoreCacheService.getOrRender(
      this.score,
      platformWidth,
      this.isDarkMode(),
      cacheKey
    );

    // Display the SVG in the canvas
    this.musicCanvas.nativeElement.innerHTML = svg;
  }
}
