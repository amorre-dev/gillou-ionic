import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreHistoryPage } from './score-history.page';

describe('ScoreHistoryPage', () => {
  let component: ScoreHistoryPage;
  let fixture: ComponentFixture<ScoreHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
