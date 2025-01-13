import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
} from '@ionic/angular/standalone';
import { ScoreService } from 'src/app/services/score.service';
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
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton,
  ],
})
export class SettingsPage {
  tone = this.scoreService.tone;
  isOrderOriginal = this.scoreService.isOrderOriginal;
  isDarkMode = this.themeService.isDarkMode;

  constructor(
    private scoreService: ScoreService,
    private themeService: ThemeService
  ) {}

  switchTone(tone: 'sib' | 'mib') {
    this.scoreService.setTone(tone); // Update the tone
  }

  toggleTone(event: any) {
    const newTone = event.detail.checked ? 'mib' : 'sib';
    this.switchTone(newTone);
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
