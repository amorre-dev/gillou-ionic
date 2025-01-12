import { ARLEQUIN_ID } from '../identifiers/score-identifiers';
import ArlequinMib from './mib/arlequin.mib';
import ArlequinSib from './sib/arlequin.sib';
import { Score } from 'src/app/types/score.type';

const Arlequin = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? ArlequinSib() : ArlequinMib();

  return {
    ...ARLEQUIN_ID,
    timeSignature: '6/8',
    ...sheetData,
  };
};

export default Arlequin;
