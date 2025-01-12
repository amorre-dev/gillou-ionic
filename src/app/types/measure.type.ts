import { Beam, StaveNote, StaveTie } from 'vexflow';

export interface Measure {
  notes: StaveNote[];
  beams?: Beam[];
  ties?: StaveTie[];
  weight: number;
}
