import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gesture, GestureController, Platform } from '@ionic/angular';
import { Score } from '../../types/score.type';
import { ThemeService } from '../../services/theme.service';
import { ScoreRenderedCacheService } from '../../services/score-rendered-cache.service';
import { ScoreHistoryService } from '../../services/score-history.service';

const DOUBLE_TAP_THRESHOLD_MS = 500;

@Component({
  selector: 'app-music-display',
  standalone: true,
  template: ` <div #musicCanvas></div> `,
  styleUrls: ['./music-display.component.scss'],
})
export class MusicDisplayComponent implements AfterViewInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly platform = inject(Platform);
  private readonly scoreCacheService = inject(ScoreRenderedCacheService);
  private readonly gestureCtrl = inject(GestureController);
  private readonly historyService = inject(ScoreHistoryService);

  readonly score = input.required<Score>();

  private readonly musicCanvas =
    viewChild<ElementRef<HTMLDivElement>>('musicCanvas');
  private readonly screenWidth = signal(this.platform.width());

  private gesture?: Gesture;
  private lastTapAt = 0;

  constructor() {
    // Window resize also fires on device rotation, so one listener covers both.
    this.platform.resize
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.screenWidth.set(this.platform.width()));

    // Re-renders whenever the score, the theme, the width or the canvas element changes.
    effect(() => {
      const canvas = this.musicCanvas();
      const svg = this.scoreCacheService.getOrRender(
        this.score(),
        this.screenWidth(),
        this.themeService.isDarkMode()
      );
      if (canvas) {
        canvas.nativeElement.innerHTML = svg;
      }
    });
  }

  ngAfterViewInit() {
    const canvas = this.musicCanvas();
    if (!canvas) {
      return;
    }
    this.gesture = this.gestureCtrl.create({
      el: canvas.nativeElement,
      threshold: 0,
      gestureName: 'double-tap',
      onStart: () => this.onTap(),
    });
    this.gesture.enable();
  }

  ngOnDestroy() {
    this.gesture?.destroy();
  }

  /** A double tap on the score announces it (same as the "+" button). */
  private onTap() {
    const now = Date.now();
    if (now - this.lastTapAt <= DOUBLE_TAP_THRESHOLD_MS) {
      const score = this.score();
      this.historyService.addToHistory(score.id, score.title, score.number);
      this.lastTapAt = 0;
    } else {
      this.lastTapAt = now;
    }
  }
}
