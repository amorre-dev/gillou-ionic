import { POSTILLON_DE_LONGJUMEAU_ID } from '../identifiers/score-identifiers';
import { Score } from 'src/app/types/score.type';
import PostillonDeLongjumeauMib from './mib/postillon-de-longjumeau.mib';
import PostillonDeLongjumeauSib from './sib/postillon-de-longjumeau.sib';

const PostillonDeLongjumeau = (tone: 'sib' | 'mib'): Score => {
  const sheetData =
    tone === 'sib' ? PostillonDeLongjumeauSib() : PostillonDeLongjumeauMib();

  return {
    ...POSTILLON_DE_LONGJUMEAU_ID,
    ...sheetData,
    timeSignature: '6/8',
  };
};

export default PostillonDeLongjumeau;
