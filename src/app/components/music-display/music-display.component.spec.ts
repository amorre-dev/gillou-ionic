import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';
import { MusicDisplayComponent } from './music-display.component';
import { SCORE_REGISTRY } from 'src/app/data/score.registery';
import { ScoreHistoryService } from 'src/app/services/score-history.service';

describe('MusicDisplayComponent', () => {
  let fixture: ComponentFixture<MusicDisplayComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [MusicDisplayComponent],
      providers: [provideIonicAngular()],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicDisplayComponent);
    fixture.componentRef.setInput('score', SCORE_REGISTRY[0].getScore('sib'));
    fixture.detectChanges();
  });

  it('draws the score as SVG', () => {
    expect(fixture.nativeElement.querySelector('svg')).not.toBeNull();
  });

  it('redraws when the score changes', () => {
    const before = fixture.nativeElement.innerHTML;
    fixture.componentRef.setInput('score', SCORE_REGISTRY[1].getScore('sib'));
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toEqual(before);
  });

  it('does not add to the history on its own', () => {
    expect(TestBed.inject(ScoreHistoryService).isHistoryEmpty()).toBeTrue();
  });
});
