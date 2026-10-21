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

  readonly isHistoryEmpty = this.scoreHistoryService.isHistoryEmpty;

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  deleteHistory() {
    this.scoreHistoryService.deleteHistory();
  }
}
