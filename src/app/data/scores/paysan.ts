import { Score } from 'src/app/types/score.type';
import { PAYSAN_ID } from '../identifiers/score-identifiers';
import PaysanSib from './sib/paysan.sib';
import PaysanMib from './mib/paysan.mib';

const Paysan = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? PaysanSib() : PaysanMib();

  return {
    ...PAYSAN_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default Paysan;
