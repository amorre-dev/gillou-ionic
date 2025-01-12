import { StaveNote, Beam, Dot, Accidental } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';
import { dotted } from 'src/app/helpers/dotted.helper';

const MitantDesCampsSib = (): SheetData => {
  const note1_m1 = dotted(new StaveNote({ keys: ['b/4'], duration: 'qdr' }));
  const note2_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '8',
  }).setStemDirection(-1);

  const note1_m2 = new StaveNote({
    keys: ['f/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note2_m2 = new StaveNote({
    keys: ['f/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note3_m2 = dotted(new StaveNote({ keys: ['d/5'], duration: '8d' }));
  const note4_m2 = new StaveNote({ keys: ['c/5'], duration: '16' }).addModifier(
    new Accidental('#')
  );

  const note1_m3 = new StaveNote({
    keys: ['d/5'],
    duration: '2',
  }).setStemDirection(-1);

  const beam1_m2 = new Beam([note1_m2, note2_m2]);
  const beam2_m2 = new Beam([note3_m2, note4_m2]);

  const measures: Measure[] = [
    { notes: [note1_m1, note2_m1], beams: [], weight: 4 },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2],
      beams: [beam1_m2, beam2_m2],
      weight: 4,
    },
    { notes: [note1_m3], beams: [], weight: 2 },
  ];

  return {
    keySignature: 'F',
    measures,
    clef: 'treble',
  };
};

export default MitantDesCampsSib;
