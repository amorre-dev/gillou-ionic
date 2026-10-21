import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonBadge,
  ModalController,
  Platform,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';
import { MusicDisplayComponent } from 'src/app/components/music-display/music-display.component';
import { ToneSegmentComponent } from 'src/app/components/tone-segment/tone-segment.component';
import { ScoreService } from 'src/app/services/score.service';
import { BADGE_COLORS, BADGE_MAX } from 'src/theme/badge.theme';
import { ScoreHistoryModalComponent } from 'src/app/components/score-history/score-history-modal/score-history-modal.component';
import { ScoreHistoryService } from 'src/app/services/score-history.service';
import { HapticsService } from 'src/app/services/haptics.service';
import { relativeTimeFr } from 'src/app/helpers/relative-time.helper';

/** Below this width (Pixel 8 viewport) the toolbar tone chooser shows icons only. */
const TOGGLE_MIN_WIDTH = 412;

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.page.html',
  styleUrls: ['./score-list.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    MusicDisplayComponent,
    ToneSegmentComponent,
    IonIcon,
  ],
})
export class ScoreListPage {
  private readonly scoreService = inject(ScoreService);
  private readonly platform = inject(Platform);
  private readonly modalCtrl = inject(ModalController);
  private readonly scoreHistoryService = inject(ScoreHistoryService);
  private readonly haptics = inject(HapticsService);

  readonly scores = this.scoreService.scores;
  readonly pageWidth = signal(this.platform.width());

  constructor() {
    addIcons({ add, remove });
    this.platform.resize
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.pageWidth.set(this.platform.width()));
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ScoreHistoryModalComponent,
      cssClass: 'history-sheet',
      breakpoints: [0, 0.6, 1],
      initialBreakpoint: 0.6,
    });
    await modal.present();
  }

  addScoreToHistory(scoreId: string, scoreTitle: string, scoreNumber: number) {
    this.scoreHistoryService.addToHistory(scoreId, scoreTitle, scoreNumber);
    this.haptics.added();
  }

  removeScoreFromHistory(scoreId: string) {
    if (this.scoreHistoryService.getOccurrences(scoreId) > 0) {
      this.scoreHistoryService.removeLastByScoreId(scoreId);
      this.haptics.removed();
    }
  }

  /** Today's count: what the badge shows. */
  getTodayOccurrences(scoreId: string): number {
    return this.scoreHistoryService.getTodayOccurrences(scoreId);
  }

  getTodayLabel(scoreId: string): string {
    return `${this.getTodayOccurrences(scoreId)} aujourd'hui`;
  }

  /** "10 au total · il y a 12 min" (the badge already shows today's count), or a hint when never played. */
  getScoreMeta(scoreId: string): string {
    const today = this.scoreHistoryService.getTodayOccurrences(scoreId);
    const total = this.scoreHistoryService.getOccurrences(scoreId);
    const last = this.scoreHistoryService.getLastPlayed(scoreId);
    if (total === 0 || !last) {
      return 'Pas encore annoncé';
    }
    const parts: string[] = [];
    if (total !== today) {
      parts.push(`${total} au total`);
    }
    parts.push(relativeTimeFr(last, this.scoreHistoryService.now()));
    return parts.join(' · ');
  }

  isToggleButtonOk() {
    return this.pageWidth() >= TOGGLE_MIN_WIDTH;
  }

  getBadgeBackgroundColor(value: number): string {
    const foundColor = BADGE_COLORS.find((c) => c.key === value);
    return foundColor ? foundColor.code : BADGE_MAX.code;
  }

  getBadgeTextColor(value: number): string {
    const foundColor = BADGE_COLORS.find((c) => c.key === value % 10);
    if (!foundColor) {
      return BADGE_MAX.text;
    }
    return value < 10 ? foundColor.text : foundColor.code;
  }
}
