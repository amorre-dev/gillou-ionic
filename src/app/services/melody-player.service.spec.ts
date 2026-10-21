import { TestBed } from '@angular/core/testing';
import { MelodyPlayerService, TEMPO_DEFAULT } from './melody-player.service';
import { SCORE_REGISTRY } from '../data/score.registery';
import { resetPersistenceForTests, seedPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('MelodyPlayerService', () => {
  const fresh = (): MelodyPlayerService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(MelodyPlayerService);
  };

  beforeEach(() => resetPersistenceForTests());

  it('persists a clamped tempo', () => {
    const player = fresh();
    expect(player.tempo()).toBe(TEMPO_DEFAULT);
    player.setTempo(500);
    expect(player.tempo()).toBe(160);
    expect(fresh().tempo()).toBe(160);
    seedPersistenceForTests('tempo', 'abc');
    expect(fresh().tempo()).toBe(TEMPO_DEFAULT);
  });

  it('tracks which score is playing and toggles it off', () => {
    const player = fresh();
    const score = SCORE_REGISTRY[0].getScore('sib');
    player.toggle(score);
    expect(player.playingScoreId()).toBe(score.id);
    player.toggle(score);
    expect(player.playingScoreId()).toBeNull();
    player.toggle(score);
    player.stop();
    expect(player.playingScoreId()).toBeNull();
  });
});
