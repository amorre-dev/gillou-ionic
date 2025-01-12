import { Score } from 'src/app/types/score.type';
import { AMBULANT_ID } from '../identifiers/score-identifiers';
import AmbulantSib from './sib/ambulant.sib';
import AmbulantMib from './mib/ambulant.mib';

const Ambulant = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? AmbulantSib() : AmbulantMib();

  return {
    ...AMBULANT_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default Ambulant;
