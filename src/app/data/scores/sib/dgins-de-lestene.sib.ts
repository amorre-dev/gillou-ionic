import { StaveNote, Beam, StaveTie, Accidental } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';

const DginsDeLesteneSib = (): SheetData => {
  const note1_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note2_m1 = new StaveNote({ keys: ['c/5'], duration: '16' });
  const note3_m1 = new StaveNote({ keys: ['d/5'], duration: '16' });
  const note4_m1 = new StaveNote({ keys: ['c/5'], duration: '8' });
  const note5_m1 = new StaveNote({
    keys: ['b/4'],
    duration: '8',
  }).addModifier(new Accidental('n'));
  const note6_m1 = new StaveNote({ keys: ['c/5'], duration: '8' });
  const beam1_m1 = new Beam([note2_m1, note3_m1]);
  const beam2_m1 = new Beam([note4_m1, note5_m1, note6_m1]);
  const tie1_m1 = new StaveTie({ first_note: note2_m1, last_note: note4_m1 });

  const note1_m2 = new StaveNote({
    keys: ['f/5'],
    duration: 'q',
  }).setStemDirection(-1);
  const note2_m2 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note3_m2 = new StaveNote({ keys: ['b/4'], duration: 'qr' });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1, note4_m1, note5_m1, note6_m1],
      beams: [beam1_m1, beam2_m1],
      ties: [tie1_m1],
      weight: 6,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2],
      weight: 3,
    },
  ];

  return {
    keySignature: 'F',
    measures,
    clef: 'treble',
  };
};

export default DginsDeLesteneSib;
