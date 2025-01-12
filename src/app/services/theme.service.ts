import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Set the initial theme
    this.updateTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    if (prefersDark.addEventListener) {
      prefersDark.addEventListener('change', (mediaQuery) =>
        this.updateTheme(mediaQuery.matches)
      );
    } else if ('onchange' in prefersDark) {
      // Fallback for older browsers
      prefersDark.onchange = (mediaQuery) =>
        this.updateTheme(mediaQuery.matches);
    }
  }

  private updateTheme(isDark: boolean) {
    this.isDarkMode.set(isDark); // Update the signal
    this.toggleDarkTheme(isDark); // Toggle the theme
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(event: CustomEvent) {
    this.toggleDarkTheme(event.detail.checked);
  }

  private toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
