import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScoreHistoryDisplayComponent } from './score-history-display.component';

describe('ScoreHistoryComponent', () => {
  let component: ScoreHistoryDisplayComponent;
  let fixture: ComponentFixture<ScoreHistoryDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreHistoryDisplayComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreHistoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
