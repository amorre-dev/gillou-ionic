import { Score } from 'src/app/types/score.type';
import { VIVENT_LES_BLEUS_ID } from '../identifiers/score-identifiers';
import ViventLesBleusSib from './sib/vivent-les-bleus.sib';
import ViventLesBleusMib from './mib/vivent-les-bleus.mib';

const ViventLesBleus = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? ViventLesBleusSib() : ViventLesBleusMib();

  return {
    ...VIVENT_LES_BLEUS_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default ViventLesBleus;
