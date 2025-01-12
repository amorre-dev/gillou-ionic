import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReorderScoresPage } from './reorder-scores.page';

describe('ReorderScoresPage', () => {
  let component: ReorderScoresPage;
  let fixture: ComponentFixture<ReorderScoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
