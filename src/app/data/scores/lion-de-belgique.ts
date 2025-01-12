import { LION_DE_BELGIQUE_ID } from '../identifiers/score-identifiers';
import { Score } from 'src/app/types/score.type';
import LionDeBelgiqueSib from './sib/lion-de-belgique.sib';
import LionDeBelgiqueMib from './mib/lion-de-belgique.mib';

const LionDeBelgique = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? LionDeBelgiqueSib() : LionDeBelgiqueMib();

  return {
    ...LION_DE_BELGIQUE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default LionDeBelgique;
