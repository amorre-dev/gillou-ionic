import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { CarnivalArchiveService } from 'src/app/services/carnival-archive.service';
import { carnivalDateRange } from 'src/app/helpers/carnival-day.helper';
import { SavedCarnival } from 'src/app/types/saved-carnival.type';

@Component({
  selector: 'app-carnivals',
  templateUrl: './carnivals.page.html',
  styleUrls: ['./carnivals.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonIcon,
    RouterLink,
    DatePipe,
  ],
})
export class CarnivalsPage {
  private readonly archive = inject(CarnivalArchiveService);

  readonly carnivals = this.archive.carnivalsNewestFirst;
  readonly isEmpty = this.archive.isEmpty;

  rangeOf(carnival: SavedCarnival) {
    return carnivalDateRange(carnival.entries);
  }
}
