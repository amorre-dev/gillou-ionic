import { Dot, StaveNote } from 'vexflow';

export function dotted(note: StaveNote) {
  Dot.buildAndAttach([note], { all: true });
  return note;
}
