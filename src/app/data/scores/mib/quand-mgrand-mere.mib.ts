import { StaveNote, Beam, StaveTie } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';

const QuandMgrandMereMib = (): SheetData => {
  const note1_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note2_m1 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note3_m1 = new StaveNote({ keys: ['d/4'], duration: '8' });
  const beam1_m1 = new Beam([note2_m1, note3_m1]);
  const tie1_m1 = new StaveTie({ first_note: note2_m1, last_note: note3_m1 });
  tie1_m1.render_options = {
    cp2: 50,
    last_x_shift: 5,
    tie_spacing: 0,
    cp1: 45,
    first_x_shift: -8,
    text_shift_x: 0,
    y_shift: 10,
  };

  const note1_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note2_m2 = new StaveNote({ keys: ['d/4'], duration: '8' });
  const note3_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note4_m2 = new StaveNote({ keys: ['f/4'], duration: '8' });
  const beam1_m2 = new Beam([note1_m2, note2_m2]);
  const beam2_m2 = new Beam([note3_m2, note4_m2]);
  const tie1_m2 = new StaveTie({ first_note: note1_m2, last_note: note2_m2 });

  const note1_m3 = new StaveNote({ keys: ['g/4'], duration: 'q' });
  const note2_m3 = new StaveNote({ keys: ['b/4'], duration: 'qr' });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1],
      beams: [beam1_m1],
      ties: [tie1_m1],
      weight: 3,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2],
      beams: [beam1_m2, beam2_m2],
      ties: [tie1_m2],
      weight: 5,
    },
    { notes: [note1_m3, note2_m3], weight: 3 },
  ];

  return {
    keySignature: 'C',
    measures,
    clef: 'treble',
  };
};

export default QuandMgrandMereMib;
