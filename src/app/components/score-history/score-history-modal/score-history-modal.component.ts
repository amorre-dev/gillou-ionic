import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController,
  IonIcon,
} from '@ionic/angular';
import { ScoreHistoryDisplayComponent } from '../score-history-display.component';
import { ScoreHistoryService } from 'src/app/services/score-history.service';
import { HistoryActionsService } from 'src/app/services/history-actions.service';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-score-history-modal',
  templateUrl: './score-history-modal.component.html',
  styleUrls: ['./score-history-modal.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    ScoreHistoryDisplayComponent,
  ],
})
export class ScoreHistoryModalComponent {
  private readonly modalCtrl = inject(ModalController);
  private readonly scoreHistoryService = inject(ScoreHistoryService);
  private readonly actions = inject(HistoryActionsService);

  readonly isHistoryEmpty = this.scoreHistoryService.isHistoryEmpty;

  constructor() {
    addIcons({ close });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  saveAsCarnival() {
    return this.actions.saveCurrentHistory();
  }

  showStats() {
    return this.actions.showStats(this.scoreHistoryService.scoreHistory());
  }

  deleteHistory() {
    return this.actions.confirmClearHistory();
  }
}
