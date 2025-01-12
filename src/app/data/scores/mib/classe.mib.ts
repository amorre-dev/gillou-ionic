import { StaveNote, StaveTie, Beam } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';
import { dotted } from 'src/app/helpers/dotted.helper';

const ClasseMib = (): SheetData => {
  // Measure 1
  const note1_m1 = dotted(new StaveNote({ keys: ['g/4'], duration: '8d' }));
  const note2_m1 = new StaveNote({ keys: ['g/4'], duration: '16' });
  const note3_m1 = dotted(new StaveNote({ keys: ['a/4'], duration: '8d' }));
  const note4_m1 = new StaveNote({ keys: ['a/4'], duration: '16' });
  const beam1_m1 = new Beam([note1_m1, note2_m1]);
  const beam2_m1 = new Beam([note3_m1, note4_m1]);
  const tie1_m1 = new StaveTie({ first_note: note2_m1, last_note: note3_m1 });

  // Measure 2
  const note1_m2 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note2_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note3_m2 = new StaveNote({ keys: ['e/4'], duration: 'q' });
  const beam1_m2 = new Beam([note1_m2, note2_m2]);
  const tie1_m2 = new StaveTie({ first_note: note4_m1, last_note: note1_m2 });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1, note4_m1],
      beams: [beam1_m1, beam2_m1],
      ties: [tie1_m1],
      weight: 4,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2],
      beams: [beam1_m2],
      ties: [tie1_m2],
      weight: 3,
    },
  ];

  return {
    keySignature: 'C',
    measures,
    clef: 'treble',
  };
};

export default ClasseMib;
