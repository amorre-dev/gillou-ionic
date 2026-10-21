import { LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

registerLocaleData(localeFr);

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // One layout on every platform: left-aligned titles, opaque accent header, Material controls.
    provideIonicAngular({ mode: 'md' }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
