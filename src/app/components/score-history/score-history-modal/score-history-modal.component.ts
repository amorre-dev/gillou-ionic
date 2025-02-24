import { Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController,
  IonIcon,
} from '@ionic/angular/standalone';
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
  isHistoryEmpty = this.scoreHistoryService.isHistoryEmpty;

  constructor(
    private modalCtrl: ModalController,
    private scoreHistoryService: ScoreHistoryService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  deleteHistory() {
    this.scoreHistoryService.deleteHistory();
  }
}
