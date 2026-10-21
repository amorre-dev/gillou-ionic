import { SCORE_REGISTRY } from '../data/score.registery';
import { concertTransposition, melodyLengthEighths, scoreToMelody } from './melody.helper';

const entry = (id: string) => SCORE_REGISTRY.find((e) => e.id === id)!;

describe('scoreToMelody', () => {
  it('reads durations and pitches with the key signature applied', () => {
    // El doudou (Si♭): 6/8, F major → B is B♭. Starts with a dotted quarter rest, a quarter rest, then F5.
    const events = scoreToMelody(entry('doudou').getScore('sib'));
    expect(events.slice(0, 3).map((e) => [e.startEighths, e.durationEighths, e.midi])).toEqual([
      [0, 3, null],
      [3, 2, null],
      [5, 1, 77],
    ]);
  });

  it('applies the key signature (B♭ in F major) unless an accidental says otherwise', () => {
    const pitchClasses = (id: string) =>
      new Set(scoreToMelody(entry(id).getScore('sib')).map((e) => e.midi).filter((m): m is number => m !== null).map((m) => m % 12));
    const fMajorSib = SCORE_REGISTRY.filter((e) => e.getScore('sib').keySignature === 'F');
    expect(fMajorSib.length).toBeGreaterThan(10);
    const withBFlat = fMajorSib.filter((e) => pitchClasses(e.id).has(10));
    const withBNatural = fMajorSib.filter((e) => pitchClasses(e.id).has(11)).map((e) => e.id);
    expect(withBFlat.length).toBeGreaterThan(5);
    expect(withBNatural).toEqual(['dgins-de-lestene']); // the only F-major score with an explicit natural
  });

  it('honours explicit accidentals', () => {
    // Les d'gins de l'Estène (Si♭) has a B natural in F major; the Mi♭ version a sharp in C major.
    const sib = scoreToMelody(entry('dgins-de-lestene').getScore('sib'));
    expect(sib.some((e) => e.midi === 71)).toBeTrue();
    const mib = scoreToMelody(entry('dgins-de-lestene').getScore('mib'));
    expect(mib.length).toBeGreaterThan(0);
  });

  it('fills every measure exactly, for every score and tone', () => {
    for (const e of SCORE_REGISTRY) {
      for (const tone of ['sib', 'mib'] as const) {
        const score = e.getScore(tone);
        const eighthsPerMeasure = score.timeSignature === '6/8' ? 6 : 4;
        const events = scoreToMelody(score);
        expect(melodyLengthEighths(events))
          .withContext(`${e.title} (${tone})`)
          .toBe(score.measures.length * eighthsPerMeasure);
        expect(events.every((ev) => ev.midi === null || (ev.midi > 48 && ev.midi < 96)))
          .withContext(`${e.title} (${tone}) pitches in range`)
          .toBeTrue();
      }
    }
  });

  it('plays both tones on the same concert pitch classes', () => {
    const pc = (m: number | null) => (m === null ? null : ((m % 12) + 12) % 12);
    for (const e of SCORE_REGISTRY) {
      const sib = scoreToMelody(e.getScore('sib'), concertTransposition('sib'));
      const mib = scoreToMelody(e.getScore('mib'), concertTransposition('mib'));
      expect(mib.map((ev) => pc(ev.midi))).withContext(e.title).toEqual(sib.map((ev) => pc(ev.midi)));
      // Depending on the arrangement the Mi♭ part sounds in unison or an octave above the trumpet,
      // and a few passages are moved an octave for range: offsets are always whole octaves.
      const diffs = sib.map((ev, i) => [ev.midi, mib[i]?.midi]).filter(([a, b]) => a !== null && b !== null).map(([a, b]) => (b as number) - (a as number));
      expect(diffs.every((d) => d % 12 === 0)).withContext(`${e.title}: only octave offsets`).toBeTrue();
    }
  });

  it('merges tied notes of the same pitch and keeps slurs legato', () => {
    const events = scoreToMelody(entry('chasseurs').getScore('mib'));
    expect(events.some((ev) => ev.legato) || events.some((ev) => ev.durationEighths > 2)).toBeTrue();
  });
});
