import { BRIGANDS_ID } from '../identifiers/score-identifiers';
import BrigandsMib from './mib/brigands.mib';
import BrigandsSib from './sib/brigands.sib';
import { Score } from 'src/app/types/score.type';

const Brigands = (tone: 'sib' | 'mib'): Score => {
  const sheetData = tone === 'sib' ? BrigandsSib() : BrigandsMib();

  return {
    ...BRIGANDS_ID,
    timeSignature: '6/8',
    ...sheetData,
  };
};

export default Brigands;
