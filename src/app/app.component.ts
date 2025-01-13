import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { ScoreRenderedCacheService } from './services/score-rendered-cache.service';
import { StatusBar } from '@capacitor/status-bar';

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
  ],
})
export class AppComponent implements OnInit {
  private ASSET_FOLDER = 'assets/icon/';

  public appPages = [
    {
      title: 'Annonces',
      url: '/score-list',
      icon: this.ASSET_FOLDER + 'queue_music.svg',
    },
    {
      title: 'Ordre des annonces',
      url: '/score-order',
      icon: this.ASSET_FOLDER + 'low_priority.svg',
    },
    {
      title: 'Historique des annonces',
      url: '/score-history',
      icon: this.ASSET_FOLDER + 'history.svg',
    },
    {
      title: 'Options',
      url: '/settings',
      icon: this.ASSET_FOLDER + 'settings.svg',
    },
  ];
  constructor(private scoreRenderedCacheService: ScoreRenderedCacheService) {}

  async ngOnInit(): Promise<void> {
    StatusBar.setBackgroundColor({ color: '#fc861d' });
    this.scoreRenderedCacheService.initCache();
  }
}
