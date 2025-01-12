import { StaveNote, Beam } from 'vexflow';
import { Measure } from 'src/app/types/measure.type';
import { dotted } from 'src/app/helpers/dotted.helper';
import { SheetData } from 'src/app/types/sheet-data.type';

const CavalcadeMib = (): SheetData => {
  const note1_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note2_m1 = dotted(new StaveNote({ keys: ['g/4'], duration: '8d' }));
  const note3_m1 = new StaveNote({ keys: ['f/4'], duration: '16' });
  const beam1_m1 = new Beam([note2_m1, note3_m1]);

  const note1_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note2_m2 = new StaveNote({ keys: ['e/4'], duration: '16' });
  const note3_m2 = new StaveNote({ keys: ['e/4'], duration: '16' });
  const note4_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note5_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const beam1_m2 = new Beam([note1_m2, note2_m2, note3_m2]);
  const beam2_m2 = new Beam([note4_m2, note5_m2]);

  const note1_m3 = new StaveNote({ keys: ['e/4'], duration: 'q' });
  const note2_m3 = new StaveNote({ keys: ['b/4'], duration: 'qr' });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1],
      beams: [beam1_m1],
      weight: 3,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2, note5_m2],
      beams: [beam1_m2, beam2_m2],
      weight: 5,
    },
    {
      notes: [note1_m3, note2_m3],
      weight: 2,
    },
  ];

  return {
    keySignature: 'C',
    measures,
    clef: 'treble',
  };
};

export default CavalcadeMib;
