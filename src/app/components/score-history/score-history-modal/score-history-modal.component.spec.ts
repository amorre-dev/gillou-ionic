import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';
import { ScoreHistoryModalComponent } from './score-history-modal.component';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('ScoreHistoryModalComponent', () => {
  let component: ScoreHistoryModalComponent;
  let fixture: ComponentFixture<ScoreHistoryModalComponent>;

  beforeEach(async () => {
    resetPersistenceForTests();
    await TestBed.configureTestingModule({
      imports: [ScoreHistoryModalComponent],
      providers: [provideIonicAngular()],
    }).compileComponents();
    fixture = TestBed.createComponent(ScoreHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
