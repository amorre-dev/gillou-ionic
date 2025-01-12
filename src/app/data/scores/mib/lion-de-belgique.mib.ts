import { dotted } from 'src/app/helpers/dotted.helper';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Beam, StaveNote, StaveTie } from 'vexflow';

const LionDeBelgiqueMib = (): SheetData => {
  const note1_m1 = dotted(new StaveNote({ keys: ['b/4'], duration: 'qdr' }));
  const note2_m1 = new StaveNote({ keys: ['g/4'], duration: '8' });

  const note1_m2 = new StaveNote({
    keys: ['c/5'],
    duration: 'q',
  }).setStemDirection(-1);
  const note2_m2 = new StaveNote({
    keys: ['e/5'],
    duration: 'q',
  }).setStemDirection(-1);

  const note1_m3 = new StaveNote({
    keys: ['d/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note2_m3 = new StaveNote({
    keys: ['c/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m3 = new StaveNote({
    keys: ['b/4'],
    duration: '16',
  }).setStemDirection(-1);
  const note4_m3 = new StaveNote({
    keys: ['c/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note5_m3 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note6_m3 = new StaveNote({ keys: ['b/4'], duration: '8r' });

  const beam1_m3 = new Beam([note1_m3, note2_m3, note3_m3, note4_m3]);
  const tie1_m3 = new StaveTie({ first_note: note1_m3, last_note: note5_m3 });

  return {
    keySignature: 'C',
    clef: 'treble',
    measures: [
      {
        notes: [note1_m1, note2_m1],
        beams: [],
        ties: [],
        weight: 4,
      },
      {
        notes: [note1_m2, note2_m2],
        beams: [],
        ties: [],
        weight: 3,
      },
      {
        notes: [note1_m3, note2_m3, note3_m3, note4_m3, note5_m3, note6_m3],
        beams: [beam1_m3],
        ties: [tie1_m3],
        weight: 6,
      },
    ],
  };
};
export default LionDeBelgiqueMib;
