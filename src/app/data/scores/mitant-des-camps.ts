import { MITANT_DES_CAMPS_ID } from '../identifiers/score-identifiers';
import MitantDesCampsMib from './mib/mitant-des-camps.mib';
import MitantDesCampsSib from './sib/mitant-des-camps.sib';
import { Score } from 'src/app/types/score.type';

const MitantDesCamps = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? MitantDesCampsSib() : MitantDesCampsMib();

  return {
    ...MITANT_DES_CAMPS_ID,
    timeSignature: '2/4',
    ...sheetData,
  };
};

export default MitantDesCamps;
