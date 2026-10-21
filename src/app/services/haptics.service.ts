import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/** Short physical feedback for announcement taps; silent on the web. */
@Injectable({
  providedIn: 'root',
})
export class HapticsService {
  private readonly native = Capacitor.isNativePlatform();

  /** An announcement was added. */
  added() {
    void this.impact(ImpactStyle.Light);
  }

  /** An announcement was removed. */
  removed() {
    void this.impact(ImpactStyle.Medium);
  }

  private async impact(style: ImpactStyle) {
    if (!this.native) {
      return;
    }
    try {
      await Haptics.impact({ style });
    } catch {
      // Device without a vibrator: ignore.
    }
  }
}
