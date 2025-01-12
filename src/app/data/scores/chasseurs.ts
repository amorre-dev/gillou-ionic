import { CHASSEURS_ID } from '../identifiers/score-identifiers';
import ChasseursMib from './mib/chasseurs.mib';
import ChasseursSib from './sib/chasseurs.sib';
import { Score } from 'src/app/types/score.type';

const Chasseurs = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? ChasseursSib() : ChasseursMib();

  return {
    ...CHASSEURS_ID,
    timeSignature: '2/4',
    ...sheetData,
  };
};

export default Chasseurs;
