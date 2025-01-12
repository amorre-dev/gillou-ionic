import { AIR_CLASSIQUE_ID } from '../identifiers/score-identifiers';
import { Score } from 'src/app/types/score.type';
import AirClassiqueSib from './sib/air-classique.sib';
import AirClassiqueMib from './mib/air-classique.mib';

const AirClassique = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? AirClassiqueSib() : AirClassiqueMib();

  return {
    ...AIR_CLASSIQUE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default AirClassique;
