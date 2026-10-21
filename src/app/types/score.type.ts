import { Measure } from './measure.type';
import { Tone } from './tone.type';

export interface Score {
  id: string;
  title: string;
  number: number;
  /** Which instrument key this instance was built for; lets the renderer rebuild it fresh. */
  tone: Tone;
  clef: string;
  timeSignature: string;
  keySignature: string;
  measures: Measure[];
}
