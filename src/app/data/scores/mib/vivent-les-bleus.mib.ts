import { StaveNote, StaveTie, Beam } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';

const ViventLesBleusMib = (): SheetData => {
  // Measure 1
  const note1_m1 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note2_m1 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note3_m1 = new StaveNote({ keys: ['f/4'], duration: '8' });
  const note4_m1 = new StaveNote({ keys: ['a/4'], duration: '8' });
  const beam1_m1 = new Beam([note1_m1, note2_m1]);
  const beam2_m1 = new Beam([note3_m1, note4_m1]);
  const tie1_m1 = new StaveTie({ first_note: note1_m1, last_note: note2_m1 });
  const tie2_m1 = new StaveTie({ first_note: note3_m1, last_note: note4_m1 });

  // Measure 2
  const note1_m2 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note2_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note3_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note4_m2 = new StaveNote({ keys: ['b/4'], duration: '8r' });
  const beam1_m2 = new Beam([note1_m2, note2_m2]);
  const tie1_m2 = new StaveTie({ first_note: note1_m2, last_note: note2_m2 });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1, note4_m1],
      beams: [beam1_m1, beam2_m1],
      ties: [tie1_m1, tie2_m1],
      weight: 1,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2],
      beams: [beam1_m2],
      ties: [tie1_m2],
      weight: 1,
    },
  ];

  return {
    keySignature: 'C',
    measures,
    clef: 'treble',
  };
};

export default ViventLesBleusMib;
