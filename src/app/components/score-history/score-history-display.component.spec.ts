import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';
import { ScoreHistoryDisplayComponent } from './score-history-display.component';
import { ScoreHistoryService } from 'src/app/services/score-history.service';

describe('ScoreHistoryDisplayComponent', () => {
  let fixture: ComponentFixture<ScoreHistoryDisplayComponent>;
  let history: ScoreHistoryService;

  beforeEach(async () => {
    localStorage.clear();
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

    const titles = Array.from(
      fixture.nativeElement.querySelectorAll('h2') as NodeListOf<HTMLElement>
    ).map((h) => h.textContent?.trim());
    expect(titles).toEqual(['12 - La classe', '19 - El doudou']);
  });
});
