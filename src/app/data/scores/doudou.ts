import { DOUDOU_ID } from '../identifiers/score-identifiers';
import DoudouMib from './mib/doudou.mib';
import DoudouSib from './sib/doudou.sib';
import { Score } from 'src/app/types/score.type';

const Doudou = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? DoudouSib() : DoudouMib();

  return {
    ...DOUDOU_ID,
    timeSignature: '6/8',
    ...sheetData,
  };
};

export default Doudou;
