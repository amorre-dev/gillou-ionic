import { Injectable, signal } from '@angular/core';
import { readRaw, writeRaw } from '../helpers/storage.helper';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  readonly isDarkMode = signal(false);

  /** True once the user chose a theme explicitly; the system preference is then ignored. */
  private hasUserPreference = false;

  constructor() {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const stored = readRaw(this.STORAGE_KEY);

    this.hasUserPreference = stored === 'dark' || stored === 'light';
    this.applyTheme(this.hasUserPreference ? stored === 'dark' : systemDark.matches);

    const onSystemChange = (event: MediaQueryListEvent) => {
      if (!this.hasUserPreference) {
        this.applyTheme(event.matches);
      }
    };
    if (typeof systemDark.addEventListener === 'function') {
      systemDark.addEventListener('change', onSystemChange);
    } else {
      // Safari < 14
      systemDark.addListener(onSystemChange);
    }
  }

  toggleTheme() {
    const isDark = !this.isDarkMode();
    this.hasUserPreference = true;
    writeRaw(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean) {
    this.isDarkMode.set(isDark);
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
  }
}
