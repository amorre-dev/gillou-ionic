import { QUAND_MGRAND_MERE_ID } from '../identifiers/score-identifiers';
import QuandMgrandMereMib from './mib/quand-mgrand-mere.mib';
import QuandMgrandMereSib from './sib/quand-mgrand-mere.sib';
import { Score } from 'src/app/types/score.type';

const QuandMgrandMere = (tone: 'sib' | 'mib'): Score => {
  const sheetData =
    tone === 'sib' ? QuandMgrandMereSib() : QuandMgrandMereMib();

  return {
    ...QUAND_MGRAND_MERE_ID,
    timeSignature: '2/4',
    ...sheetData,
  };
};

export default QuandMgrandMere;
