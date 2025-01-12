import { Measure } from './measure.type';

export interface Score {
  id: string;
  title: string;
  number: number;
  clef: string;
  timeSignature: string;
  keySignature: string;
  measures: Measure[];
}
