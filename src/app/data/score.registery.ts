import AirClassique from 'src/app/data/scores/air-classique';
import LionDeBelgique from 'src/app/data/scores/lion-de-belgique';
import PostillonDeLongjumeau from 'src/app/data/scores/postillon-de-longjumeau';
import {
  AIR_CLASSIQUE_ID,
  AMBULANT_ID,
  ARLEQUIN_ID,
  AUBADE_MATINALE_ID,
  BRIGANDS_ID,
  CAVALCADE_ID,
  CHASSEURS_ID,
  CLASSE_ID,
  DGINS_DE_LESTENE_ID,
  DOUDOU_ID,
  ELOI_A_CHARLEROI_ID,
  JUIF_ERRANT_ID,
  LION_DE_BELGIQUE_ID,
  MARINS_ID,
  MERE_TANT_PIS_ID,
  MITANT_DES_CAMPS_ID,
  PAS_DE_CHARGE_ID,
  PAYSAN_ID,
  PETIT_JEUNE_HOMME_DE_BINCHE_ID,
  POLKA_MARCHE_ID,
  POSTILLON_DE_LONGJUMEAU_ID,
  QUAND_MGRAND_MERE_ID,
  SANS_SOUCIS_ID,
  SERENADE_ID,
  TROMPETTE_DES_CENT_GARDES_ID,
  VIVENT_LES_BLEUS_ID,
  VOS_AREZ_IN_AUBADE_ID,
} from './identifiers/score-identifiers';
import SansSouci from './scores/sans-soucis';
import PetitJeuneHommeDeBinche from './scores/petit-jeune-homme-de-binche';
import Ambulant from './scores/ambulant';
import ViventLesBleus from './scores/vivent-les-bleus';
import Paysan from './scores/paysan';
import EloiACharleroi from './scores/eloi-a-charleroi';
import Cavalcade from './scores/cavalcade';
import JuifErrant from './scores/juif-errant';
import Classe from './scores/classe';
import Serenade from './scores/serenade';
import PasDeCharge from './scores/pas-de-charge';
import MereTantPis from './scores/mere-tant-pis';
import VosArezInAubade from './scores/vos-arez-in-aubade';
import Arlequin from './scores/arlequin';
import DginsDeLestene from './scores/dgins-de-lestene';
import Doudou from './scores/doudou';
import QuandMgrandMere from './scores/quand-mgrand-mere';
import Chasseurs from './scores/chasseurs';
import TrompetteDesCentGardes from './scores/trompette-des-cent-gardes';
import Marins from './scores/marins';
import Brigands from './scores/brigands';
import PolkaMarche from './scores/polka-marche';
import AubadeMatinale from './scores/aubade-matinale';
import MitantDesCamps from './scores/mitant-des-camps';

export const SCORE_REGISTRY = [
  { ...AIR_CLASSIQUE_ID, getScore: AirClassique },
  { ...LION_DE_BELGIQUE_ID, getScore: LionDeBelgique },
  { ...POSTILLON_DE_LONGJUMEAU_ID, getScore: PostillonDeLongjumeau },
  { ...SANS_SOUCIS_ID, getScore: SansSouci },
  { ...PETIT_JEUNE_HOMME_DE_BINCHE_ID, getScore: PetitJeuneHommeDeBinche },
  { ...AMBULANT_ID, getScore: Ambulant },
  { ...VIVENT_LES_BLEUS_ID, getScore: ViventLesBleus },
  { ...PAYSAN_ID, getScore: Paysan },
  { ...ELOI_A_CHARLEROI_ID, getScore: EloiACharleroi },
  { ...CAVALCADE_ID, getScore: Cavalcade },
  { ...JUIF_ERRANT_ID, getScore: JuifErrant },
  { ...CLASSE_ID, getScore: Classe },
  { ...SERENADE_ID, getScore: Serenade },
  { ...PAS_DE_CHARGE_ID, getScore: PasDeCharge },
  { ...MERE_TANT_PIS_ID, getScore: MereTantPis },
  { ...VOS_AREZ_IN_AUBADE_ID, getScore: VosArezInAubade },
  { ...ARLEQUIN_ID, getScore: Arlequin },
  { ...DGINS_DE_LESTENE_ID, getScore: DginsDeLestene },
  { ...DOUDOU_ID, getScore: Doudou },
  { ...QUAND_MGRAND_MERE_ID, getScore: QuandMgrandMere },
  { ...CHASSEURS_ID, getScore: Chasseurs },
  { ...TROMPETTE_DES_CENT_GARDES_ID, getScore: TrompetteDesCentGardes },
  { ...MARINS_ID, getScore: Marins },
  { ...BRIGANDS_ID, getScore: Brigands },
  { ...POLKA_MARCHE_ID, getScore: PolkaMarche },
  { ...AUBADE_MATINALE_ID, getScore: AubadeMatinale },
  { ...MITANT_DES_CAMPS_ID, getScore: MitantDesCamps },
];
