import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonToggle,
  IonItemDivider,
  IonCheckbox,
  IonButton,
  IonButtons,
  IonMenuButton,
  ToggleCustomEvent,
} from '@ionic/angular';
import { ScoreService, Tone } from 'src/app/services/score.service';
import {
  AUBADE_MATINALE_ID,
  MITANT_DES_CAMPS_ID,
} from 'src/app/data/identifiers/score-identifiers';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCheckbox,
    IonItemDivider,
    IonToggle,
    IonIcon,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
  ],
})
export class SettingsPage {
  private readonly scoreService = inject(ScoreService);
  private readonly themeService = inject(ThemeService);

  readonly tone = this.scoreService.tone;
  readonly isOrderOriginal = this.scoreService.isOrderOriginal;
  readonly isDarkMode = this.themeService.isDarkMode;

  switchTone(tone: Tone) {
    this.scoreService.setTone(tone);
  }

  toggleTone(event: ToggleCustomEvent) {
    this.switchTone(event.detail.checked ? 'mib' : 'sib');
  }

  isAubadeRemoved(): boolean {
    return this.scoreService.isScoreRemoved(AUBADE_MATINALE_ID.id);
  }

  toggleAubade() {
    this.scoreService.toggleScore(AUBADE_MATINALE_ID.id);
  }

  isMitantDesCampsRemoved(): boolean {
    return this.scoreService.isScoreRemoved(MITANT_DES_CAMPS_ID.id);
  }

  toggleMitantDesCamps() {
    this.scoreService.toggleScore(MITANT_DES_CAMPS_ID.id);
  }

  resetOrder() {
    this.scoreService.resetOrder();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
