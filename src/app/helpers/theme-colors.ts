/**
 * Light-palette colours of the Gillou theme, for code that cannot read CSS variables
 * (the canvas-rendered stats card, the native status bar).
 *
 * This file MIRRORS `src/theme/variables.scss` (the `:root` light palette): when a token
 * changes there, change it here too. Everything rendered by the DOM reads the CSS variables
 * directly; only add a value here when CSS cannot reach it.
 */
export const LIGHT_THEME = {
  /** --gillou-bg-main */
  bgMain: '#fff6ee',
  /** --gillou-accent (= --ion-color-primary) */
  accent: '#e9a262',
  /** --gillou-on-accent */
  onAccent: '#3b2312',
  /** --gillou-surface */
  surface: '#ffffff',
  /** --gillou-outline */
  outline: '#f0d6bc',
  /** --gillou-ink */
  ink: '#5a3519',
  /** --gillou-ink-muted */
  inkMuted: '#8a6545',
  /** --gillou-tonal */
  tonal: '#fae8d8',
  /** --gillou-brand */
  brand: '#e8892a',
} as const;
