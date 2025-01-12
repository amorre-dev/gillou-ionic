import { Score } from 'src/app/types/score.type';
import { CLASSE_ID } from '../identifiers/score-identifiers';
import ClasseSib from './sib/classe.sib';
import ClasseMib from './mib/classe.mib';

const Classe = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? ClasseSib() : ClasseMib();

  return {
    ...CLASSE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default Classe;
