import { Injectable, signal } from '@angular/core';
import { readRaw, writeRaw } from '../helpers/storage.helper';

/**
 * Keeps the screen on while the app is visible, using the Screen Wake Lock API
 * (available in the Android WebView and iOS 16.4+ WebKit the app targets). On by default:
 * a phone that locks mid-announcement is the main friction in the street.
 */
@Injectable({
  providedIn: 'root',
})
export class KeepAwakeService {
  private readonly STORAGE_KEY = 'keepAwake';

  readonly isSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;
  readonly enabled = signal(readRaw(this.STORAGE_KEY) !== 'off');

  private sentinel: WakeLockSentinel | null = null;

  constructor() {
    if (!this.isSupported) {
      return;
    }
    // The lock is released whenever the page is hidden; take it again when it comes back.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        void this.apply();
      }
    });
    void this.apply();
  }

  setEnabled(enabled: boolean) {
    this.enabled.set(enabled);
    writeRaw(this.STORAGE_KEY, enabled ? 'on' : 'off');
    void this.apply();
  }

  private async apply() {
    if (!this.isSupported) {
      return;
    }
    try {
      if (this.enabled()) {
        if (!this.sentinel || this.sentinel.released) {
          this.sentinel = await navigator.wakeLock.request('screen');
        }
      } else if (this.sentinel && !this.sentinel.released) {
        await this.sentinel.release();
        this.sentinel = null;
      }
    } catch (error) {
      // Not granted (e.g. low battery mode): nothing to do, the toggle stays as chosen.
      console.warn('Screen wake lock unavailable', error);
    }
  }
}
