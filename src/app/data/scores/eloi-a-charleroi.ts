import { Score } from 'src/app/types/score.type';
import { ELOI_A_CHARLEROI_ID } from '../identifiers/score-identifiers';
import EloiACharleroiSib from './sib/eloi-a-charleroi.sib';
import EloiACharleroiMib from './mib/eloi-a-charleroi.mib';

const EloiACharleroi = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? EloiACharleroiSib() : EloiACharleroiMib();

  return {
    ...ELOI_A_CHARLEROI_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default EloiACharleroi;
