import { inject, Injectable } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ScoreHistoryService } from './score-history.service';
import { CarnivalArchiveService } from './carnival-archive.service';
import {
  CarnivalSaveModalComponent,
  CarnivalSaveResult,
} from '../components/carnival-save-modal/carnival-save-modal.component';
import { SavedCarnival } from '../types/saved-carnival.type';
import { ScoreHistory } from '../types/score-history.type';
import { CarnivalStatsModalComponent } from '../components/carnival-stats-modal/carnival-stats-modal.component';

/** User flows around the history: save it as a carnival, edit a carnival, clear with confirmation. */
@Injectable({
  providedIn: 'root',
})
export class HistoryActionsService {
  private readonly modalCtrl = inject(ModalController);
  private readonly alertCtrl = inject(AlertController);
  private readonly toastCtrl = inject(ToastController);
  private readonly history = inject(ScoreHistoryService);
  private readonly archive = inject(CarnivalArchiveService);

  /** Opens the save form; on confirm, archives the current history and optionally clears it. */
  async saveCurrentHistory(): Promise<SavedCarnival | null> {
    const entries = this.history.scoreHistory();
    if (entries.length === 0) {
      return null;
    }
    const modal = await this.modalCtrl.create({
      component: CarnivalSaveModalComponent,
      componentProps: { entries },
      cssClass: 'form-modal',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss<CarnivalSaveResult>();
    if (role !== 'save' || !data) {
      return null;
    }
    const carnival = this.archive.save(data.details, entries);
    if (data.clearHistory) {
      this.history.deleteHistory();
    }
    await this.toast(`« ${carnival.name} » enregistré`);
    return carnival;
  }

  /** Opens the form pre-filled with a saved carnival and applies the edited details. */
  async editCarnival(carnival: SavedCarnival): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: CarnivalSaveModalComponent,
      componentProps: { existing: carnival },
      cssClass: 'form-modal',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss<CarnivalSaveResult>();
    if (role !== 'save' || !data) {
      return false;
    }
    this.archive.update(carnival.id, data.details);
    return true;
  }

  /** Shows "Mon carnaval en chiffres" for a carnival, or for the live history when no name is given. */
  async showStats(entries: readonly ScoreHistory[], name = 'Mon carnaval', location = ''): Promise<void> {
    if (entries.length === 0) {
      return;
    }
    const modal = await this.modalCtrl.create({
      component: CarnivalStatsModalComponent,
      componentProps: { entries: [...entries], name, location },
      cssClass: 'form-modal',
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  /** Asks before wiping the live history. Resolves true when it was cleared. */
  async confirmClearHistory(): Promise<boolean> {
    const count = this.history.scoreHistory().length;
    if (count === 0) {
      return false;
    }
    return this.confirm({
      header: "Effacer l'historique ?",
      message: `${count} annonce${count > 1 ? 's' : ''} seront supprimées. Pensez à enregistrer le carnaval avant.`,
      confirmText: 'Effacer',
      onConfirm: () => this.history.deleteHistory(),
    });
  }

  /** Asks before deleting a saved carnival. Resolves true when it was deleted. */
  async confirmDeleteCarnival(carnival: SavedCarnival): Promise<boolean> {
    return this.confirm({
      header: 'Supprimer ce carnaval ?',
      message: `« ${carnival.name} » et ses ${carnival.entries.length} annonces seront supprimés définitivement.`,
      confirmText: 'Supprimer',
      onConfirm: () => this.archive.remove(carnival.id),
    });
  }

  private async confirm(options: {
    header: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  }): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      cssClass: 'gillou-alert',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: options.confirmText, role: 'destructive' },
      ],
    });
    await alert.present();
    const { role } = await alert.onWillDismiss();
    if (role !== 'destructive') {
      return false;
    }
    options.onConfirm();
    return true;
  }

  private async toast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2200,
      position: 'bottom',
      cssClass: 'gillou-toast',
    });
    await toast.present();
  }
}
