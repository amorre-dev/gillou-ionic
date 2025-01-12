import { StaveNote, Beam, StaveTie } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';
import { dotted } from 'src/app/helpers/dotted.helper';

const VosArezInAubadeMib = (): SheetData => {
  const note1_m1 = dotted(new StaveNote({ keys: ['b/4'], duration: 'qdr' }));
  const note2_m1 = new StaveNote({ keys: ['e/4'], duration: '16' });
  const note3_m1 = new StaveNote({ keys: ['f/4'], duration: '16' });
  const beam1_m1 = new Beam([note2_m1, note3_m1]);

  const note1_m2 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note2_m2 = new StaveNote({ keys: ['c/5'], duration: '8' });
  const note3_m2 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }); //.setStemDirection(-1);
  const note4_m2 = new StaveNote({
    keys: ['b/4'],
    duration: '16',
  }); //.setStemDirection(-1);
  const note5_m2 = new StaveNote({
    keys: ['a/4'],
    duration: '16',
  }); //.setStemDirection(-1);
  const beam1_m2 = new Beam([note1_m2, note2_m2]);
  const beam2_m2 = new Beam([note3_m2, note4_m2, note5_m2]);
  const tie1_m2 = new StaveTie({ first_note: note2_m1, last_note: note2_m2 });
  tie1_m2.render_options = {
    cp2: 30,
    last_x_shift: 10,
    tie_spacing: 0,
    cp1: 25,
    first_x_shift: -8,
    text_shift_x: 0,
    y_shift: 10,
  };

  const note1_m3 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note2_m3 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note3_m3 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note4_m3 = new StaveNote({ keys: ['b/4'], duration: '8r' });
  const beam1_m3 = new Beam([note1_m3, note2_m3]);

  const tie1_m3 = new StaveTie({ first_note: note3_m2, last_note: note2_m3 });
  tie1_m3.render_options = {
    cp2: 30,
    last_x_shift: 10,
    tie_spacing: 0,
    cp1: 25,
    first_x_shift: -8,
    text_shift_x: 0,
    y_shift: 10,
  };

  const measures: Measure[] = [
    { notes: [note1_m1, note2_m1, note3_m1], beams: [beam1_m1], weight: 3 },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2, note5_m2],
      beams: [beam1_m2, beam2_m2],
      ties: [tie1_m2],
      weight: 6,
    },
    {
      notes: [note1_m3, note2_m3, note3_m3, note4_m3],
      beams: [beam1_m3],
      ties: [tie1_m3],
      weight: 4,
    },
  ];

  return {
    keySignature: 'C',
    measures,
    clef: 'treble',
  };
};

export default VosArezInAubadeMib;
