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
import { KeepAwakeService } from 'src/app/services/keep-awake.service';
import { BackupService } from 'src/app/services/backup.service';
import { IonRange, RangeCustomEvent, ToggleCustomEvent } from '@ionic/angular';
import { MelodyPlayerService, TEMPO_MAX, TEMPO_MIN } from 'src/app/services/melody-player.service';

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
    IonRange,
    ToneSegmentComponent,
  ],
})
export class SettingsPage {
  private readonly scoreService = inject(ScoreService);
  private readonly themeService = inject(ThemeService);
  private readonly keepAwake = inject(KeepAwakeService);
  private readonly backup = inject(BackupService);
  private readonly player = inject(MelodyPlayerService);

  readonly isOrderOriginal = this.scoreService.isOrderOriginal;
  readonly isDarkMode = this.themeService.isDarkMode;
  readonly keepAwakeSupported = this.keepAwake.isSupported;
  readonly keepAwakeEnabled = this.keepAwake.enabled;
  readonly tempo = this.player.tempo;
  readonly tempoMin = TEMPO_MIN;
  readonly tempoMax = TEMPO_MAX;
  readonly canPlay = this.player.isSupported;

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

  toggleKeepAwake(event: ToggleCustomEvent) {
    this.keepAwake.setEnabled(event.detail.checked);
  }

  onTempo(event: RangeCustomEvent) {
    const value = event.detail.value;
    this.player.setTempo(typeof value === 'number' ? value : value.lower);
  }

  exportBackup() {
    return this.backup.exportBackup();
  }

  importBackup() {
    return this.backup.importBackup();
  }
}
