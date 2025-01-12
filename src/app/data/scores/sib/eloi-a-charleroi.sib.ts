import { StaveNote, Beam, StaveTie } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';
import { dotted } from 'src/app/helpers/dotted.helper';

const EloiACharleroiSib = (): SheetData => {
  const note1_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note2_m1 = new StaveNote({
    keys: ['c/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m1 = new StaveNote({
    keys: ['d/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note4_m1 = new StaveNote({
    keys: ['c/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note5_m1 = new StaveNote({
    keys: ['a/4'],
    duration: '16',
  }).setStemDirection(-1);
  const beam1_m1 = new Beam([note2_m1, note3_m1, note4_m1, note5_m1]);

  const tie1_m1 = new StaveTie({ first_note: note2_m1, last_note: note5_m1 });
  tie1_m1.render_options = {
    cp2: 25,
    last_x_shift: 10,
    tie_spacing: 0,
    cp1: 20,
    first_x_shift: -10,
    text_shift_x: 0,
    y_shift: 13,
  };

  const note1_m2 = dotted(new StaveNote({ keys: ['f/4'], duration: '8d' }));
  const note2_m2 = new StaveNote({ keys: ['g/4'], duration: '16' });
  const note3_m2 = new StaveNote({ keys: ['a/4'], duration: '8' });
  const note4_m2 = new StaveNote({ keys: ['a/4'], duration: '8' });
  const beam1_m2 = new Beam([note1_m2, note2_m2, note3_m2, note4_m2]);

  const note1_m3 = new StaveNote({ keys: ['g/4'], duration: 'q' });
  const note2_m3 = new StaveNote({ keys: ['b/4'], duration: 'qr' });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1, note4_m1, note5_m1],
      beams: [beam1_m1],
      ties: [tie1_m1],
      weight: 5,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2],
      beams: [beam1_m2],
      weight: 5,
    },
    {
      notes: [note1_m3, note2_m3],
      weight: 2,
    },
  ];

  return {
    keySignature: 'F',
    measures,
    clef: 'treble',
  };
};

export default EloiACharleroiSib;
