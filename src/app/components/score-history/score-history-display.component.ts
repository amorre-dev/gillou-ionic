import { Component } from '@angular/core';
import { ScoreHistoryService } from 'src/app/services/score-history.service';
import { IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-score-history-display',
  templateUrl: './score-history-display.component.html',
  styleUrls: ['./score-history-display.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonList, IonItem, DatePipe],
})
export class ScoreHistoryDisplayComponent {
  scoreHistory = this.scoreHistoryService.scoreHistory;

  constructor(private scoreHistoryService: ScoreHistoryService) {}

  removeById(historyId: string) {
    this.scoreHistoryService.removeFromHistory(historyId);
  }
}
