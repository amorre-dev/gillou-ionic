import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { CarnivalArchiveService } from 'src/app/services/carnival-archive.service';
import { HistoryActionsService } from 'src/app/services/history-actions.service';
import { carnivalDateRange, countByScore } from 'src/app/helpers/carnival-day.helper';
import { rankScores } from 'src/app/helpers/carnival-stats.helper';
import { ScoreHistoryDisplayComponent } from 'src/app/components/score-history/score-history-display.component';

@Component({
  selector: 'app-carnival-detail',
  templateUrl: './carnival-detail.page.html',
  styleUrls: ['./carnival-detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonTitle,
    IonContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    ScoreHistoryDisplayComponent,
    DatePipe,
  ],
})
export class CarnivalDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly archive = inject(CarnivalArchiveService);
  private readonly actions = inject(HistoryActionsService);

  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), {
    initialValue: '',
  });

  readonly carnival = computed(() => this.archive.getById(this.id()));
  readonly range = computed(() => {
    const c = this.carnival();
    return c ? carnivalDateRange(c.entries) : null;
  });
  readonly summary = computed(() => {
    const c = this.carnival();
    return c ? countByScore(c.entries) : [];
  });
  readonly ranks = computed(() => {
    const c = this.carnival();
    return c ? rankScores(c.entries) : null;
  });

  async showStats() {
    const carnival = this.carnival();
    if (carnival) {
      await this.actions.showStats(carnival.entries, carnival.name, carnival.location);
    }
  }

  async edit() {
    const carnival = this.carnival();
    if (carnival) {
      await this.actions.editCarnival(carnival);
    }
  }

  async remove() {
    const carnival = this.carnival();
    if (carnival && (await this.actions.confirmDeleteCarnival(carnival))) {
      await this.router.navigate(['/carnivals'], { replaceUrl: true });
    }
  }
}
