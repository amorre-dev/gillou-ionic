import { StaveNote, Beam } from 'vexflow';
import { Measure } from 'src/app/types/measure.type';
import { SheetData } from 'src/app/types/sheet-data.type';

const PolkaMarcheSib = (): SheetData => {
  const note1_m1 = new StaveNote({
    keys: ['d/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note2_m1 = new StaveNote({
    keys: ['d/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m1 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note4_m1 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note5_m1 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const beam1_m1 = new Beam([note1_m1, note2_m1, note3_m1]);
  const beam2_m1 = new Beam([note4_m1, note5_m1]);

  const note1_m2 = new StaveNote({
    keys: ['d/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note2_m2 = new StaveNote({
    keys: ['d/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m2 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note4_m2 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note5_m2 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const beam1_m2 = new Beam([note1_m2, note2_m2, note3_m2]);
  const beam2_m2 = new Beam([note4_m2, note5_m2]);

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1, note4_m1, note5_m1],
      beams: [beam1_m1, beam2_m1],
      weight: 4,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2, note5_m2],
      beams: [beam1_m2, beam2_m2],
      weight: 4,
    },
  ];

  return {
    keySignature: 'G',
    measures,
    clef: 'treble',
  };
};

export default PolkaMarcheSib;
