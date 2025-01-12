import { MARINS_ID } from '../identifiers/score-identifiers';
import MarinsMib from './mib/marins.mib';
import MarinsSib from './sib/marins.sib';
import { Score } from 'src/app/types/score.type';

const Marins = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? MarinsSib() : MarinsMib();

  return {
    ...MARINS_ID,
    timeSignature: '2/4',
    ...sheetData,
  };
};

export default Marins;
