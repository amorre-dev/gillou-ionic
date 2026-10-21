import { inject, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { exportPersistence, importPersistence, PERSISTED_KEYS } from '../helpers/storage.helper';
import { FileShareService } from './file-share.service';

interface BackupFile {
  app: 'gillou';
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
}

const isBackupFile = (value: unknown): value is BackupFile => {
  const record = value as Record<string, unknown> | null;
  return (
    typeof record === 'object' &&
    record !== null &&
    record['app'] === 'gillou' &&
    typeof record['data'] === 'object' &&
    record['data'] !== null
  );
};

/** Full backup of the app data as a file the user keeps or moves to a new phone. */
@Injectable({
  providedIn: 'root',
})
export class BackupService {
  private readonly files = inject(FileShareService);
  private readonly alertCtrl = inject(AlertController);
  private readonly toastCtrl = inject(ToastController);

  async exportBackup(): Promise<void> {
    const backup: BackupFile = {
      app: 'gillou',
      version: 1,
      exportedAt: new Date().toISOString(),
      data: exportPersistence(),
    };
    const stamp = backup.exportedAt.slice(0, 10);
    await this.files.shareText(
      `gillou-sauvegarde-${stamp}.json`,
      JSON.stringify(backup, null, 2),
      'application/json',
      'Sauvegarde Gillou'
    );
  }

  async importBackup(): Promise<boolean> {
    const text = await this.files.pickTextFile('application/json,.json');
    if (text === null) {
      return false;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      await this.toast('Ce fichier n\'est pas une sauvegarde Gillou.');
      return false;
    }
    if (!isBackupFile(parsed)) {
      await this.toast('Ce fichier n\'est pas une sauvegarde Gillou.');
      return false;
    }
    const known = PERSISTED_KEYS.filter((key) => typeof parsed.data[key] === 'string');
    const alert = await this.alertCtrl.create({
      header: 'Restaurer cette sauvegarde ?',
      message: `Sauvegarde du ${parsed.exportedAt?.slice(0, 10) ?? '?'}. Les données actuelles seront remplacées (${known.length} éléments). L'application redémarrera.`,
      cssClass: 'gillou-alert',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Restaurer', role: 'destructive' },
      ],
    });
    await alert.present();
    const { role } = await alert.onWillDismiss();
    if (role !== 'destructive') {
      return false;
    }
    importPersistence(parsed.data);
    // Services hold the old values in signals: the simplest consistent state is a reload.
    setTimeout(() => window.location.reload(), 300);
    return true;
  }

  private async toast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2600, cssClass: 'gillou-toast' });
    await toast.present();
  }
}
