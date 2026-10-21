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
  IonCheckbox,
  IonButton,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular';
import { ScoreService } from 'src/app/services/score.service';
import {
  AUBADE_MATINALE_ID,
  MITANT_DES_CAMPS_ID,
} from 'src/app/data/identifiers/score-identifiers';
import { ThemeService } from 'src/app/services/theme.service';
import { ToneSegmentComponent } from 'src/app/components/tone-segment/tone-segment.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCheckbox,
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
    ToneSegmentComponent,
  ],
})
export class SettingsPage {
  private readonly scoreService = inject(ScoreService);
  private readonly themeService = inject(ThemeService);

  readonly isOrderOriginal = this.scoreService.isOrderOriginal;
  readonly isDarkMode = this.themeService.isDarkMode;

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
