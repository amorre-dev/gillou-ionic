/**
 * Announcement-count badge colours, from a quiet cream (0) through the brand apricot (5)
 * to a deep plum (10). Key 5 is the accent token. Values above 10 reuse the darkest background with the ramp colour as text.
 */
export interface BadgeColor {
  key: number;
  /** Background. */
  code: string;
  /** Readable text colour on that background. */
  text: string;
}

export const BADGE_COLORS: readonly BadgeColor[] = [
  { key: 0, code: '#fbf1e6', text: '#5a3a26' },
  { key: 1, code: '#f9e3cc', text: '#5a3a26' },
  { key: 2, code: '#f7d4b1', text: '#4a2e1c' },
  { key: 3, code: '#f6c596', text: '#4a2e1c' },
  { key: 4, code: '#f1bb86', text: '#3b2312' },
  { key: 5, code: '#e9a262', text: '#3b2312' },
  { key: 6, code: '#e58e6b', text: '#fff6ee' },
  { key: 7, code: '#d6766a', text: '#fff6ee' },
  { key: 8, code: '#bf5f68', text: '#fff6ee' },
  { key: 9, code: '#8e4a5e', text: '#fff6ee' },
  { key: 10, code: '#4a2f3a', text: '#fff6ee' },
];

export const BADGE_MAX = BADGE_COLORS[BADGE_COLORS.length - 1];
