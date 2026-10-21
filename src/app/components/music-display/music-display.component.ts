import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gesture, GestureController, Platform } from '@ionic/angular';
import { Score } from '../../types/score.type';
import { ScoreRenderedCacheService } from '../../services/score-rendered-cache.service';
import { ScoreHistoryService } from '../../services/score-history.service';
import { HapticsService } from '../../services/haptics.service';
import { scoreSheetWidth } from '../../helpers/layout.helper';

const DOUBLE_TAP_THRESHOLD_MS = 500;

@Component({
  selector: 'app-music-display',
  standalone: true,
  template: ` <div #musicCanvas class="music-canvas"></div> `,
  styleUrls: ['./music-display.component.scss'],
  // The SVG is injected as innerHTML, so its styles must not be scoped.
  encapsulation: ViewEncapsulation.None,
})
export class MusicDisplayComponent implements AfterViewInit, OnDestroy {
  private readonly platform = inject(Platform);
  private readonly scoreCacheService = inject(ScoreRenderedCacheService);
  private readonly gestureCtrl = inject(GestureController);
  private readonly historyService = inject(ScoreHistoryService);
  private readonly haptics = inject(HapticsService);

  readonly score = input.required<Score>();

  private readonly musicCanvas =
    viewChild<ElementRef<HTMLDivElement>>('musicCanvas');
  /** Bumped on every window resize (also fires on rotation) so the effect re-measures. */
  private readonly viewportWidth = signal(this.platform.width());

  private gesture?: Gesture;
  private lastTapAt = 0;

  constructor() {
    // Window resize also fires on device rotation, so one listener covers both.
    this.platform.resize
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.viewportWidth.set(this.platform.width()));

    // Re-renders whenever the score, the viewport or the canvas element changes (theme is CSS-only).
    effect(() => {
      const canvas = this.musicCanvas();
      const score = this.score();
      const viewportWidth = this.viewportWidth();
      if (!canvas) {
        return;
      }
      // Render at the real width of the card, falling back to the viewport-derived width.
      const width =
        canvas.nativeElement.clientWidth || scoreSheetWidth(viewportWidth);
      canvas.nativeElement.innerHTML = this.scoreCacheService.getOrRender(score, width);
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
      this.haptics.added();
      this.lastTapAt = 0;
    } else {
      this.lastTapAt = now;
    }
  }
}
