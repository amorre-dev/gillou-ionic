import { AUBADE_MATINALE_ID } from '../identifiers/score-identifiers';
import AubadeMatinaleMib from './mib/aubade-matinale.mib';
import AubadeMatinaleSib from './sib/aubade-matinale.sib';
import { Score } from 'src/app/types/score.type';

const AubadeMatinale = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? AubadeMatinaleSib() : AubadeMatinaleMib();

  return {
    ...AUBADE_MATINALE_ID,
    timeSignature: '2/4',
    ...sheetData,
  };
};

export default AubadeMatinale;
