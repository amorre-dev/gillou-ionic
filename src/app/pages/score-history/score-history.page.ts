import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
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
  constructor(private scoreHistoryService: ScoreHistoryService) {}

  deleteHistory() {
    this.scoreHistoryService.deleteHistory();
  }
}
