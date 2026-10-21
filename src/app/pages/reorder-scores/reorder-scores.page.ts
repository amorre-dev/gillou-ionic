import { Component, inject } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonReorderGroup,
  IonItem,
  IonReorder,
  IonButton,
  IonIcon,
  ItemReorderEventDetail,
} from '@ionic/angular';
import { getScoreById } from 'src/app/data/identifiers/score-identifiers';

@Component({
  selector: 'app-reorder-scores',
  templateUrl: './reorder-scores.page.html',
  styleUrls: ['./reorder-scores.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonReorder,
    IonItem,
    IonReorderGroup,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
  ],
})
export class ReorderScoresPage {
  private readonly scoreService = inject(ScoreService);

  readonly order = this.scoreService.order;
  readonly isOrderOriginal = this.scoreService.isOrderOriginal;

  reorderScores(event: CustomEvent<ItemReorderEventDetail>) {
    // complete() reorders the given array in place, so hand it a copy, never the signal's own array.
    const reordered: string[] = event.detail.complete([...this.order()]);
    this.scoreService.setOrder(reordered);
  }

  resetOrder() {
    this.scoreService.resetOrder();
  }

  getScoreIdentifierById(scoreId: string) {
    return getScoreById(scoreId);
  }
}
