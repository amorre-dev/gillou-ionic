import { Measure } from './measure.type';

export interface SheetData {
  keySignature: string;
  measures: Measure[];
  clef: string;
}
