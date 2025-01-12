import { StaveNote, Beam } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';

const MarinsSib = (): SheetData => {
  const note1_m1 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note2_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note4_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note5_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note6_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note7_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const beam1_m1 = new Beam([note1_m1, note2_m1, note3_m1]);
  const beam2_m1 = new Beam([note4_m1, note5_m1, note6_m1, note7_m1]);

  const note1_m2 = new StaveNote({
    keys: ['f/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note2_m2 = new StaveNote({
    keys: ['e/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note3_m2 = new StaveNote({
    keys: ['g/5'],
    duration: 'q',
  }).setStemDirection(-1);
  const beam1_m2 = new Beam([note1_m2, note2_m2]);

  const measures: Measure[] = [
    {
      notes: [
        note1_m1,
        note2_m1,
        note3_m1,
        note4_m1,
        note5_m1,
        note6_m1,
        note7_m1,
      ],
      beams: [beam1_m1, beam2_m1],
      weight: 8,
    },
    { notes: [note1_m2, note2_m2, note3_m2], beams: [beam1_m2], weight: 3 },
  ];

  return {
    keySignature: 'F',
    measures,
    clef: 'treble',
  };
};

export default MarinsSib;
