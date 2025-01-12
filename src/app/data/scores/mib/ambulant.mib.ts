import { StaveNote, Beam } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';

const AmbulantMib = (): SheetData => {
  // Measure 1
  const note1_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note2_m1 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note3_m1 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const beam1_m1 = new Beam([note2_m1, note3_m1]);

  // Measure 2
  const note1_m2 = new StaveNote({ keys: ['e/4'], duration: 'q' });
  const note2_m2 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note3_m2 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const beam1_m2 = new Beam([note2_m2, note3_m2]);

  // Measure 3
  const note1_m3 = new StaveNote({
    keys: ['c/5'],
    duration: 'q',
  }).setStemDirection(-1);
  const note2_m3 = new StaveNote({ keys: ['b/4'], duration: 'qr' });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1],
      beams: [beam1_m1],
      weight: 3,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2],
      beams: [beam1_m2],
      weight: 4,
    },
    {
      notes: [note1_m3, note2_m3],
      weight: 3,
    },
  ];

  return {
    keySignature: 'C',
    measures,
    clef: 'treble',
  };
};

export default AmbulantMib;
