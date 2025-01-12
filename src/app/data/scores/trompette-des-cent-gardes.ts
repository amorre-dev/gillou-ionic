import { TROMPETTE_DES_CENT_GARDES_ID } from '../identifiers/score-identifiers';
import TrompetteDesCentGardesMib from './mib/trompette-des-cent-gardes.mib';
import TrompetteDesCentGardesSib from './sib/trompette-des-cent-gardes.sib';
import { Score } from 'src/app/types/score.type';

const TrompetteDesCentGardes = (tone: 'sib' | 'mib'): Score => {
  const sheetData =
    tone === 'sib' ? TrompetteDesCentGardesSib() : TrompetteDesCentGardesMib();

  return {
    ...TROMPETTE_DES_CENT_GARDES_ID,
    timeSignature: '2/4',
    ...sheetData,
  };
};

export default TrompetteDesCentGardes;
