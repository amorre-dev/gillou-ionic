import { Score } from 'src/app/types/score.type';
import { VOS_AREZ_IN_AUBADE_ID } from '../identifiers/score-identifiers';
import VosArezInAubadeSib from './sib/vos-arez-in-aubade.sib';
import VosArezInAubadeMib from './mib/vos-arez-in-aubade.mib';

const VosArezInAubade = (tone: 'sib' | 'mib'): Score => {
  const sheetData =
    tone === 'sib' ? VosArezInAubadeSib() : VosArezInAubadeMib();

  return {
    ...VOS_AREZ_IN_AUBADE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default VosArezInAubade;
