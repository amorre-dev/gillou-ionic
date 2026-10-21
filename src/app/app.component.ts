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
import { StatusBar, Style } from '@capacitor/status-bar';
import { ScoreRenderedCacheService } from './services/score-rendered-cache.service';
import { ThemeService } from './services/theme.service';
import { EasterEggService } from './services/easter-egg.service';

const ASSET_FOLDER = 'assets/icon/';
/** Keep in sync with --ion-color-primary in src/theme/variables.scss */
const PRIMARY_COLOR = '#e9a262';

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
  /** Instantiated here so the stored/system theme is applied at startup, whatever the first page is. */
  private readonly themeService = inject(ThemeService);
  /** Instantiated here so it listens from the first announcement on. */
  private readonly easterEggs = inject(EasterEggService);

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
      title: 'Carnavals',
      url: '/carnivals',
      icon: ASSET_FOLDER + 'archive.svg',
    },
    {
      title: 'Options',
      url: '/settings',
      icon: ASSET_FOLDER + 'settings.svg',
    },
  ];

  ngOnInit(): void {
    this.themeService.isDarkMode(); // touch so the fields are not flagged as unused
    void this.easterEggs;
    if (Capacitor.isNativePlatform()) {
      // The header is a light pastel in both themes, so the status bar always needs dark icons.
      Promise.all([
        StatusBar.setStyle({ style: Style.Light }),
        StatusBar.setBackgroundColor({ color: PRIMARY_COLOR }),
      ]).catch((error) => console.warn('Could not style the status bar', error));
    }
    this.scoreRenderedCacheService
      .initCache()
      .catch((error) => console.warn('Score pre-rendering failed', error));
  }
}
