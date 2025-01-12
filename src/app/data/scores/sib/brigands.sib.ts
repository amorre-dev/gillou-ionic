import { StaveNote, Beam } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';

const BrigandsSib = (): SheetData => {
  const note1_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note2_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note3_m1 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note4_m1 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }).setStemDirection(-1);
  const beam1_m1 = new Beam([note3_m1, note4_m1]);

  const note1_m2 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note2_m2 = new StaveNote({
    keys: ['d/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note3_m2 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note4_m2 = new StaveNote({
    keys: ['b/4'],
    duration: '8',
  }).setStemDirection(-1);
  const note5_m2 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note6_m2 = new StaveNote({
    keys: ['b/4'],
    duration: '8',
  }).setStemDirection(-1);
  const beam1_m2 = new Beam([note1_m2, note2_m2, note3_m2]);
  const beam2_m2 = new Beam([note4_m2, note5_m2, note6_m2]);

  const note1_m3 = new StaveNote({ keys: ['a/4'], duration: '8' });
  const note2_m3 = new StaveNote({ keys: ['f/4'], duration: '8r' });
  const note3_m3 = new StaveNote({
    keys: ['c/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note4_m3 = new StaveNote({
    keys: ['f/5'],
    duration: '8',
  }).setStemDirection(-1);
  const note5_m3 = new StaveNote({ keys: ['b/4'], duration: 'qr' });

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1, note4_m1],
      beams: [beam1_m1],
      weight: 3.5,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2, note5_m2, note6_m2],
      beams: [beam1_m2, beam2_m2],
      weight: 5,
    },
    {
      notes: [note1_m3, note2_m3, note3_m3, note4_m3, note5_m3],
      weight: 4.5,
    },
  ];

  return {
    keySignature: 'F',
    measures,
    clef: 'treble',
  };
};

export default BrigandsSib;
