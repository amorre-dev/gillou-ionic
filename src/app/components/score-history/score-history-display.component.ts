import { Component, inject } from '@angular/core';
import { ScoreHistoryService } from 'src/app/services/score-history.service';
import { IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-score-history-display',
  templateUrl: './score-history-display.component.html',
  styleUrls: ['./score-history-display.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonList, IonItem, DatePipe],
})
export class ScoreHistoryDisplayComponent {
  private readonly scoreHistoryService = inject(ScoreHistoryService);

  readonly scoreHistory = this.scoreHistoryService.scoreHistoryNewestFirst;

  removeById(historyId: string) {
    this.scoreHistoryService.removeFromHistory(historyId);
  }
}
