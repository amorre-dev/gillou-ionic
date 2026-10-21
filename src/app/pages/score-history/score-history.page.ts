import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from '@ionic/angular';
import { ScoreHistoryDisplayComponent } from '../../components/score-history/score-history-display.component';
import { ScoreHistoryService } from 'src/app/services/score-history.service';

@Component({
  selector: 'app-score-history',
  templateUrl: './score-history.page.html',
  styleUrls: ['./score-history.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    ScoreHistoryDisplayComponent,
  ],
})
export class ScoreHistoryPage {
  private readonly scoreHistoryService = inject(ScoreHistoryService);

  readonly isHistoryEmpty = this.scoreHistoryService.isHistoryEmpty;

  deleteHistory() {
    this.scoreHistoryService.deleteHistory();
  }
}
