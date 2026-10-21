import { Component } from '@angular/core';

export const AME_URL = 'https://am-e.dev';

/**
 * "Réalisé par am-e" signature for the side menu: the four personas and the am-e lockup.
 * Inline SVG so the ink follows the theme (currentColor) and the orange uses the brand token.
 * Tapping it opens am-e.dev in the system browser.
 */
@Component({
  selector: 'app-brand-footer',
  standalone: true,
  templateUrl: './brand-footer.component.html',
  styleUrls: ['./brand-footer.component.scss'],
})
export class BrandFooterComponent {
  readonly url = AME_URL;

  open(event: Event) {
    event.preventDefault();
    // Capacitor routes window.open(_blank) to the system browser on Android and iOS;
    // in a regular browser this is simply a new tab.
    window.open(this.url, '_blank', 'noopener');
  }
}
