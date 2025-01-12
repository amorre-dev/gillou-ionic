import { TestBed } from '@angular/core/testing';

import { ScoreRenderedCacheService } from './score-rendered-cache.service';

describe('ScoreRenderedCacheService', () => {
  let service: ScoreRenderedCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreRenderedCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
