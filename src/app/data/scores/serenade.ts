import { Score } from 'src/app/types/score.type';
import { SERENADE_ID } from '../identifiers/score-identifiers';
import SerenadeSib from './sib/serenade.sib';
import SerenadeMib from './mib/serenade.mib';

const Serenade = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? SerenadeSib() : SerenadeMib();

  return {
    ...SERENADE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default Serenade;
