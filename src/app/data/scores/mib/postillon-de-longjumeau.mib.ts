import { dotted } from 'src/app/helpers/dotted.helper';
import { SheetData } from 'src/app/types/sheet-data.type';
import { Beam, StaveNote } from 'vexflow';

const PostillonDeLongjumeauMib = (): SheetData => {
  const note1_m1 = dotted(new StaveNote({ keys: ['b/4'], duration: 'qdr' }));
  const note2_m1 = new StaveNote({ keys: ['b/4'], duration: 'qr' });
  const note3_m1 = new StaveNote({ keys: ['g/4'], duration: '8' });

  const note1_m2 = new StaveNote({ keys: ['c/4'], duration: '8' });
  const note2_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note3_m2 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note4_m2 = new StaveNote({ keys: ['c/4'], duration: '8' });
  const note5_m2 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note6_m2 = new StaveNote({ keys: ['g/4'], duration: '8' });

  const beam1_m2 = new Beam([note1_m2, note2_m2, note3_m2]);
  const beam2_m2 = new Beam([note4_m2, note5_m2, note6_m2]);

  const note1_m3 = new StaveNote({ keys: ['c/4'], duration: '4' });
  const note2_m3 = new StaveNote({ keys: ['e/4'], duration: '8' });
  const note3_m3 = new StaveNote({ keys: ['g/4'], duration: '8' });
  const note4_m3 = new StaveNote({ keys: ['b/4'], duration: 'qr' });

  return {
    keySignature: 'C',
    clef: 'treble',
    measures: [
      { notes: [note1_m1, note2_m1, note3_m1], beams: [], ties: [], weight: 3 },
      {
        notes: [note1_m2, note2_m2, note3_m2, note4_m2, note5_m2, note6_m2],
        beams: [beam1_m2, beam2_m2],
        ties: [],
        weight: 4,
      },
      {
        notes: [note1_m3, note2_m3, note3_m3, note4_m3],
        beams: [],
        ties: [],
        weight: 3.5,
      },
    ],
  };
};
export default PostillonDeLongjumeauMib;
