import { Score } from 'src/app/types/score.type';
import { PETIT_JEUNE_HOMME_DE_BINCHE_ID } from '../identifiers/score-identifiers';
import PetitJeuneHommeDeBincheSib from './sib/petit-jeune-homme-de-binche.sib';
import PetitJeuneHommeDeBincheMib from './mib/petit-jeune-homme-de-binche.mib';

const PetitJeuneHommeDeBinche = (tone: 'sib' | 'mib'): Score => {
  const sheetData =
    tone === 'sib'
      ? PetitJeuneHommeDeBincheSib()
      : PetitJeuneHommeDeBincheMib();

  return {
    ...PETIT_JEUNE_HOMME_DE_BINCHE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default PetitJeuneHommeDeBinche;
