import { inject, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ScoreHistoryService } from './score-history.service';
import { ScoreService } from './score.service';
import { EasterEgg, evaluateEasterEggs } from '../helpers/easter-eggs.helper';

/** Watches announcements and pops up the easter eggs they trigger, one after another. */
@Injectable({
  providedIn: 'root',
})
export class EasterEggService {
  private readonly history = inject(ScoreHistoryService);
  private readonly scoreService = inject(ScoreService);
  private readonly alertCtrl = inject(AlertController);

  /** Alerts are shown sequentially even when several eggs fire on one announcement. */
  private queue: Promise<void> = Promise.resolve();

  constructor() {
    this.history.added$.subscribe(({ entry, before }) => {
      const eggs = evaluateEasterEggs(
        entry,
        before,
        this.scoreService.scores().map((s) => s.id)
      );
      for (const egg of eggs) {
        this.queue = this.queue.then(() => this.show(egg)).catch(() => undefined);
      }
    });
  }

  private async show(egg: EasterEgg) {
    const alert = await this.alertCtrl.create({
      message: egg.message,
      cssClass: 'gillou-alert easter-egg-alert',
      buttons: [{ text: egg.button, role: 'cancel' }],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
