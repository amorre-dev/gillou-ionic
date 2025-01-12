import { SheetData } from 'src/app/types/sheet-data.type';
import { Score } from 'src/app/types/score.type';
import { SANS_SOUCIS_ID } from '../identifiers/score-identifiers';
import SansSouciMib from './mib/sans-soucis.mib';
import SansSouciSib from './sib/sans-soucis.sib';

const SansSouci = (tone: 'sib' | 'mib'): Score => {
  const sheetData: SheetData = tone === 'sib' ? SansSouciSib() : SansSouciMib();

  return {
    ...SANS_SOUCIS_ID,
    ...sheetData,
    timeSignature: '2/4',
  };
};

export default SansSouci;
