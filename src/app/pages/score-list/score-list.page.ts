import { Component, signal, ViewChild } from '@angular/core';
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
  IonModal,
  ModalController,
} from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, remove } from 'ionicons/icons';
import { MusicDisplayComponent } from 'src/app/components/music-display/music-display.component';
import { ScoreService } from 'src/app/services/score.service';
import { BADGE_COLORS } from 'src/theme/badge.theme';
import { ScoreHistoryModalComponent } from 'src/app/components/score-history/score-history-modal/score-history-modal.component';
import { ScoreHistoryService } from 'src/app/services/score-history.service';

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
  @ViewChild(IonModal) modal!: IonModal;

  scores = this.scoreService.scores;
  tone = this.scoreService.tone;
  historyValue = 0;
  pageWidth = signal(0);

  constructor(
    private scoreService: ScoreService,
    private platform: Platform,
    private modalCtrl: ModalController,
    private scoreHistoryService: ScoreHistoryService
  ) {
    addIcons({ add, remove });
    this.pageWidth.set(platform.width());
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ScoreHistoryModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  addScoreToHistory(scoreId: string, scoreTitle: string, scoreNumber: number) {
    this.scoreHistoryService.addToHistory(scoreId, scoreTitle, scoreNumber);
  }

  removeScoreFromHistory(scoreId: string) {
    this.scoreHistoryService.removeLastByScoreId(scoreId);
  }

  getHistoryOccurrences(scoreId: string) {
    return this.scoreHistoryService.getOccurrences(scoreId)();
  }

  switchTone(tone: 'sib' | 'mib') {
    this.scoreService.setTone(tone); // Update the tone
  }

  toggleTone(event: any) {
    const newTone = event.detail.checked ? 'mib' : 'sib';
    this.switchTone(newTone);
  }

  isToggleButtonOk() {
    return this.pageWidth() >= 412; // viewport for pixel8
  }

  getIconClass(toggled: boolean): string {
    return toggled ? 'large' : 'medium';
  }

  getBadgeBackgroundColor(value: number): string {
    const foundColor = BADGE_COLORS.find((c) => c.key === value);
    return foundColor ? foundColor.code : '#000000';
  }

  getBadgeTextColor(value: number, scoreId: string): string {
    const moduloVal = value % 10;
    const foundColor = BADGE_COLORS.find((c) => c.key === moduloVal);

    if (!foundColor) {
      return '#ffffff';
    }

    return value < 10 ? foundColor.text : foundColor.code;
  }
}
