import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { ScoreHistoryPage } from './score-history.page';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('ScoreHistoryPage', () => {
  let component: ScoreHistoryPage;
  let fixture: ComponentFixture<ScoreHistoryPage>;

  beforeEach(async () => {
    resetPersistenceForTests();
    await TestBed.configureTestingModule({
      imports: [ScoreHistoryPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    fixture = TestBed.createComponent(ScoreHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
