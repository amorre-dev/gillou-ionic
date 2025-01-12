import { TestBed } from '@angular/core/testing';

import { ScoreHistoryService } from './score-history.service';

describe('ScoreHistoryService', () => {
  let service: ScoreHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
