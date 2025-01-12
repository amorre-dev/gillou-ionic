import { Score } from 'src/app/types/score.type';
import { PAS_DE_CHARGE_ID } from '../identifiers/score-identifiers';
import PasDeChargeSib from './sib/pas-de-charge.sib';
import PasDeChargeMib from './mib/pas-de-charge.mib';

const PasDeCharge = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? PasDeChargeSib() : PasDeChargeMib();

  return {
    ...PAS_DE_CHARGE_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default PasDeCharge;
