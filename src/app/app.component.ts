import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonIcon,
  IonImg,
  IonFooter,
} from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { ScoreRenderedCacheService } from './services/score-rendered-cache.service';

const ASSET_FOLDER = 'assets/icon/';
const PRIMARY_COLOR = '#fc861d';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonIcon,
    IonImg,
    IonFooter,
  ],
})
export class AppComponent implements OnInit {
  private readonly scoreRenderedCacheService = inject(ScoreRenderedCacheService);

  readonly appPages = [
    {
      title: 'Annonces',
      url: '/score-list',
      icon: ASSET_FOLDER + 'queue_music.svg',
    },
    {
      title: 'Ordre des annonces',
      url: '/score-order',
      icon: ASSET_FOLDER + 'low_priority.svg',
    },
    {
      title: 'Historique des annonces',
      url: '/score-history',
      icon: ASSET_FOLDER + 'history.svg',
    },
    {
      title: 'Options',
      url: '/settings',
      icon: ASSET_FOLDER + 'settings.svg',
    },
  ];

  ngOnInit(): void {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({ color: PRIMARY_COLOR }).catch((error) =>
        console.warn('Could not set the status bar color', error)
      );
    }
    this.scoreRenderedCacheService
      .initCache()
      .catch((error) => console.warn('Score pre-rendering failed', error));
  }
}
