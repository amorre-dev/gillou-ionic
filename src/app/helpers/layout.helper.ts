/**
 * Horizontal space a score card takes around its sheet: 2 × card margin + 2 × card padding.
 * Below COMPACT_MAX_WIDTH the theme switches to 6px/6px, otherwise 16px/14px.
 * Keep in sync with --gillou-card-margin / --gillou-card-padding in src/theme/variables.scss.
 */
export const COMPACT_MAX_WIDTH = 599;
export const SCORE_SHEET_INSET_COMPACT = 24;
export const SCORE_SHEET_INSET = 60;

/** Width available for a rendered sheet inside its card, for a given viewport width. */
export function scoreSheetWidth(viewportWidth: number): number {
  const inset = viewportWidth <= COMPACT_MAX_WIDTH ? SCORE_SHEET_INSET_COMPACT : SCORE_SHEET_INSET;
  return Math.max(200, Math.round(viewportWidth - inset));
}
