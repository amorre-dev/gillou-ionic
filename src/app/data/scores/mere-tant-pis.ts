import { Score } from 'src/app/types/score.type';
import { MERE_TANT_PIS_ID } from '../identifiers/score-identifiers';
import MereTantPisSib from './sib/mere-tant-pis.sib';
import MereTantPisMib from './mib/mere-tant-pis.mib';

const MereTantPis = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? MereTantPisSib() : MereTantPisMib();

  return {
    ...MERE_TANT_PIS_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default MereTantPis;
