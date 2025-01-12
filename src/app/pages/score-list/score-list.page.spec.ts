import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreListPage } from './score-list.page';

describe('ScoreListPage', () => {
  let component: ScoreListPage;
  let fixture: ComponentFixture<ScoreListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
