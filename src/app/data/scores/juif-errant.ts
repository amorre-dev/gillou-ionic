import { Score } from 'src/app/types/score.type';
import { JUIF_ERRANT_ID } from '../identifiers/score-identifiers';
import JuifErrantSib from './sib/juif-errant.sib';
import JuifErrantMib from './mib/juif-errant.mib';

const JuifErrant = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? JuifErrantSib() : JuifErrantMib();

  return {
    ...JUIF_ERRANT_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default JuifErrant;
