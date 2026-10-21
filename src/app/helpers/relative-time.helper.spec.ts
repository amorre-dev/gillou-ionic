import { relativeTimeFr } from './relative-time.helper';

describe('relativeTimeFr', () => {
  const now = new Date('2026-02-15T12:00:00').getTime();
  const ago = (ms: number) => new Date(now - ms).toISOString();

  it('words the elapsed time in French', () => {
    expect(relativeTimeFr(ago(10_000), now)).toBe("à l'instant");
    expect(relativeTimeFr(ago(12 * 60_000), now)).toBe('il y a 12 min');
    expect(relativeTimeFr(ago(3 * 3_600_000), now)).toBe('il y a 3 h');
    expect(relativeTimeFr(ago(30 * 3_600_000), now)).toBe('hier');
    expect(relativeTimeFr(ago(3 * 86_400_000), now)).toBe('il y a 3 j');
    expect(relativeTimeFr('garbage', now)).toBe("à l'instant");
  });
});
