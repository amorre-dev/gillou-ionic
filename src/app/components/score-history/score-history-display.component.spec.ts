import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';
import { ScoreHistoryDisplayComponent } from './score-history-display.component';
import { ScoreHistoryService } from 'src/app/services/score-history.service';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('ScoreHistoryDisplayComponent', () => {
  let fixture: ComponentFixture<ScoreHistoryDisplayComponent>;
  let history: ScoreHistoryService;

  beforeEach(async () => {
    resetPersistenceForTests();
    await TestBed.configureTestingModule({
      imports: [ScoreHistoryDisplayComponent],
      providers: [provideIonicAngular()],
    }).compileComponents();
    history = TestBed.inject(ScoreHistoryService);
    fixture = TestBed.createComponent(ScoreHistoryDisplayComponent);
    fixture.detectChanges();
  });

  it('shows the empty state', () => {
    expect(fixture.nativeElement.textContent).toContain("Pas encore d'historique");
  });

  it('lists announcements newest first, stable across change detection', () => {
    history.addToHistory('doudou', 'El doudou', 19);
    history.addToHistory('classe', 'La classe', 12);
    fixture.detectChanges();
    fixture.detectChanges();

    const text = (selector: string) =>
      Array.from(
        fixture.nativeElement.querySelectorAll(selector) as NodeListOf<HTMLElement>
      ).map((el) => el.textContent?.trim());
    expect(text('h2')).toEqual(['La classe', 'El doudou']);
    expect(text('.number-chip')).toEqual(['12', '19']);
  });
});
