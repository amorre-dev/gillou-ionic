import { StaveNote, Beam, StaveTie } from 'vexflow';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Measure } from 'src/app/types/measure.type';
import { dotted } from 'src/app/helpers/dotted.helper';

const PasDeChargeSib = (): SheetData => {
  const note1_m1 = dotted(new StaveNote({ keys: ['b/4'], duration: 'qdr' }));
  const note2_m1 = new StaveNote({
    keys: ['c/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m1 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const beam1_m1 = new Beam([note2_m1, note3_m1]);

  const note1_m2 = dotted(
    new StaveNote({ keys: ['a/5'], duration: '8d' })
  ).setStemDirection(-1);
  const note2_m2 = new StaveNote({
    keys: ['g/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m2 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note4_m2 = new StaveNote({
    keys: ['e/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note5_m2 = new StaveNote({
    keys: ['f/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note6_m2 = new StaveNote({
    keys: ['a/5'],
    duration: '16',
  }).setStemDirection(-1);
  const beam1_m2 = new Beam([note1_m2, note2_m2]);
  const beam2_m2 = new Beam([note3_m2, note4_m2, note5_m2, note6_m2]);
  const tie1_m2 = new StaveTie({ first_note: note3_m2, last_note: note4_m2 });

  const note1_m3 = dotted(
    new StaveNote({
      keys: ['g/5'],
      duration: '8d',
    })
  ).setStemDirection(-1);
  const note2_m3 = new StaveNote({
    keys: ['e/5'],
    duration: '16',
  }).setStemDirection(-1);
  const note3_m3 = new StaveNote({
    keys: ['c/5'],
    duration: 'q',
  }).setStemDirection(-1);
  const beam1_m3 = new Beam([note1_m3, note2_m3]);

  const measures: Measure[] = [
    {
      notes: [note1_m1, note2_m1, note3_m1],
      beams: [beam1_m1],
      weight: 4,
    },
    {
      notes: [note1_m2, note2_m2, note3_m2, note4_m2, note5_m2, note6_m2],
      beams: [beam1_m2, beam2_m2],
      ties: [tie1_m2],
      weight: 6,
    },
    {
      notes: [note1_m3, note2_m3, note3_m3],
      beams: [beam1_m3],
      weight: 3,
    },
  ];

  return {
    keySignature: 'F',
    measures,
    clef: 'treble',
  };
};

export default PasDeChargeSib;
