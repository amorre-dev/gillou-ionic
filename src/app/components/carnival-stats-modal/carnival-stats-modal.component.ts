import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonTitle,
  IonToolbar,
  ModalController,
  SegmentCustomEvent,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { ScoreHistory } from 'src/app/types/score-history.type';
import { buildCarnivalStats, CarnivalStats, statsToText } from 'src/app/helpers/carnival-stats.helper';
import { renderStatsCard } from 'src/app/helpers/stats-card.helper';
import { FileShareService } from 'src/app/services/file-share.service';
import { groupByCarnivalDay } from 'src/app/helpers/carnival-day.helper';

/** "Mon carnaval en chiffres": a shareable image of the numbers, whole carnival or day by day. */
@Component({
  selector: 'app-carnival-stats-modal',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  ],
  templateUrl: './carnival-stats-modal.component.html',
  styleUrls: ['./carnival-stats-modal.component.scss'],
})
export class CarnivalStatsModalComponent implements OnInit, OnDestroy {
  private readonly modalCtrl = inject(ModalController);
  private readonly toastCtrl = inject(ToastController);
  private readonly files = inject(FileShareService);

  // Plain properties: ModalController assigns componentProps directly.
  name = 'Mon carnaval';
  location = '';
  entries: ScoreHistory[] = [];

  readonly mode = signal<'all' | 'days'>('all');
  readonly multiDay = signal(false);
  readonly stats = signal<CarnivalStats | null>(null);
  readonly previewUrl = signal<string | null>(null);
  readonly text = signal('');
  readonly busy = signal(false);
  readonly canShare = this.files.canShare;

  private image: Blob | null = null;

  constructor() {
    addIcons({ close });
  }

  ngOnInit() {
    this.multiDay.set(groupByCarnivalDay(this.entries).length > 1);
    void this.refresh();
  }

  ngOnDestroy() {
    this.revoke();
  }

  onMode(event: SegmentCustomEvent) {
    const value = event.detail.value;
    if (value === 'all' || value === 'days') {
      this.mode.set(value);
      void this.refresh();
    }
  }

  async share() {
    await this.send('Mon carnaval en chiffres');
  }

  async shareToFacebook() {
    if (this.files.canShare) {
      await this.toast('Choisissez Facebook dans la liste de partage.');
      await this.send('Publier sur Facebook');
    } else {
      await this.send('Publier sur Facebook');
      window.open('https://www.facebook.com/', '_blank', 'noopener');
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  private async refresh() {
    const stats = buildCarnivalStats(this.name, this.location, this.entries, this.mode());
    this.stats.set(stats);
    this.text.set(statsToText(stats));
    this.busy.set(true);
    try {
      this.image = await renderStatsCard(stats);
      this.revoke();
      this.previewUrl.set(URL.createObjectURL(this.image));
    } catch (error) {
      console.warn('Stats card rendering failed', error);
      this.image = null;
    } finally {
      this.busy.set(false);
    }
  }

  private async send(title: string) {
    const stats = this.stats();
    if (!stats || !this.image) {
      return;
    }
    const slug = stats.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'carnaval';
    try {
      await this.files.shareImage(`gillou-${slug}.png`, this.image, this.text(), title);
    } catch (error) {
      // Dismissed share sheets reject on some platforms: not an error worth showing.
      console.debug('Share ended', error);
    }
  }

  private revoke() {
    const url = this.previewUrl();
    if (url) {
      URL.revokeObjectURL(url);
      this.previewUrl.set(null);
    }
  }

  private async toast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2200, cssClass: 'gillou-toast' });
    await toast.present();
  }
}
