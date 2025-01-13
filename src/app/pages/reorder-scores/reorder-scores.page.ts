import { Component } from '@angular/core';
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
} from '@ionic/angular/standalone';
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
  order = this.scoreService.getOrder();
  isOrderOriginal = this.scoreService.isOrderOriginal;

  constructor(private scoreService: ScoreService) {}

  reorderScores(event: CustomEvent<ItemReorderEventDetail>) {
    const reordered = event.detail.complete(this.order);
    console.log(reordered);
    this.scoreService.setOrder(reordered);
  }

  resetOrder() {
    this.scoreService.resetOrder();
    this.order = this.scoreService.getOrder();
  }

  getScoreIdentifierById(scoreId: string) {
    return getScoreById(scoreId);
  }
}
