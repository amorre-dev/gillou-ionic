import { POLKA_MARCHE_ID } from '../identifiers/score-identifiers';
import PolkaMarcheMib from './mib/polka-marche.mib';
import PolkaMarcheSib from './sib/polka-marche.sib';
import { Score } from 'src/app/types/score.type';

const PolkaMarche = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? PolkaMarcheSib() : PolkaMarcheMib();

  return {
    ...POLKA_MARCHE_ID,
    timeSignature: '2/4',
    ...sheetData,
  };
};

export default PolkaMarche;
