import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonToggle,
  ModalController,
  Platform,
  ToggleCustomEvent,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';
import { MusicDisplayComponent } from 'src/app/components/music-display/music-display.component';
import { ScoreService, Tone } from 'src/app/services/score.service';
import { BADGE_COLORS } from 'src/theme/badge.theme';
import { ScoreHistoryModalComponent } from 'src/app/components/score-history/score-history-modal/score-history-modal.component';
import { ScoreHistoryService } from 'src/app/services/score-history.service';

/** Below this width (Pixel 8 viewport) the toolbar shows a single tone button instead of the toggle. */
const TOGGLE_MIN_WIDTH = 412;

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.page.html',
  styleUrls: ['./score-list.page.scss'],
  standalone: true,
  imports: [
    IonToggle,
    IonBadge,
    IonLabel,
    IonButton,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    MusicDisplayComponent,
    IonIcon,
  ],
})
export class ScoreListPage {
  private readonly scoreService = inject(ScoreService);
  private readonly platform = inject(Platform);
  private readonly modalCtrl = inject(ModalController);
  private readonly scoreHistoryService = inject(ScoreHistoryService);

  readonly scores = this.scoreService.scores;
  readonly tone = this.scoreService.tone;
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
    });
    await modal.present();
  }

  addScoreToHistory(scoreId: string, scoreTitle: string, scoreNumber: number) {
    this.scoreHistoryService.addToHistory(scoreId, scoreTitle, scoreNumber);
  }

  removeScoreFromHistory(scoreId: string) {
    this.scoreHistoryService.removeLastByScoreId(scoreId);
  }

  getHistoryOccurrences(scoreId: string): number {
    return this.scoreHistoryService.getOccurrences(scoreId);
  }

  switchTone(tone: Tone) {
    this.scoreService.setTone(tone);
  }

  toggleTone(event: ToggleCustomEvent) {
    this.switchTone(event.detail.checked ? 'mib' : 'sib');
  }

  isToggleButtonOk() {
    return this.pageWidth() >= TOGGLE_MIN_WIDTH;
  }

  getIconClass(toggled: boolean): string {
    return toggled ? 'large' : 'medium';
  }

  getBadgeBackgroundColor(value: number): string {
    const foundColor = BADGE_COLORS.find((c) => c.key === value);
    return foundColor ? foundColor.code : '#000000';
  }

  getBadgeTextColor(value: number): string {
    const foundColor = BADGE_COLORS.find((c) => c.key === value % 10);
    if (!foundColor) {
      return '#ffffff';
    }
    return value < 10 ? foundColor.text : foundColor.code;
  }
}
