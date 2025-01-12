import { DGINS_DE_LESTENE_ID } from '../identifiers/score-identifiers';
import DginsDeLesteneMib from './mib/dgins-de-lestene.mib';
import DginsDeLesteneSib from './sib/dgins-de-lestene.sib';
import { Score } from 'src/app/types/score.type';

const DginsDeLestene = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? DginsDeLesteneSib() : DginsDeLesteneMib();

  return {
    ...DGINS_DE_LESTENE_ID,
    timeSignature: '6/8',
    ...sheetData,
  };
};

export default DginsDeLestene;
