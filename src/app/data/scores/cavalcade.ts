import { Score } from 'src/app/types/score.type';
import { CAVALCADE_ID } from '../identifiers/score-identifiers';
import CavalcadeSib from './sib/cavalcade.sib';
import CavalcadeMib from './mib/cavalcade.mib';

const Cavalcade = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? CavalcadeSib() : CavalcadeMib();

  return {
    ...CAVALCADE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default Cavalcade;
