import { Component, computed, inject, input } from '@angular/core';
import { ScoreHistoryService } from 'src/app/services/score-history.service';
import { IonList, IonItem, IonLabel, IonIcon, IonButton } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ScoreHistory } from 'src/app/types/score-history.type';
import { groupByCarnivalDay } from 'src/app/helpers/carnival-day.helper';

/**
 * Announcement log grouped by carnival day, newest first.
 * Shows the live history by default; pass `entries` to show a saved snapshot.
 */
@Component({
  selector: 'app-score-history-display',
  templateUrl: './score-history-display.component.html',
  styleUrls: ['./score-history-display.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonList, IonItem, IonButton, DatePipe],
})
export class ScoreHistoryDisplayComponent {
  private readonly scoreHistoryService = inject(ScoreHistoryService);

  /** Entries to display; when undefined, the live history is used. */
  readonly entries = input<ScoreHistory[]>();
  /** Hides the per-entry delete buttons. */
  readonly readonly = input(false);

  /** Chronological source; the day grouping orders it newest first for display. */
  readonly scoreHistory = computed(
    () => this.entries() ?? this.scoreHistoryService.scoreHistory()
  );
  readonly days = computed(() => groupByCarnivalDay(this.scoreHistory(), 'desc'));

  removeById(historyId: string) {
    this.scoreHistoryService.removeFromHistory(historyId);
  }
}
