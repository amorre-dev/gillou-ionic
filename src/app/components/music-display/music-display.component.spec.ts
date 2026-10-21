import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';
import { MusicDisplayComponent } from './music-display.component';
import { SCORE_REGISTRY } from 'src/app/data/score.registery';
import { ScoreHistoryService } from 'src/app/services/score-history.service';

const hexToRgb = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r}, ${g}, ${b})`;
};

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

  it('crops the canvas to the drawn stave', () => {
    const svg = fixture.nativeElement.querySelector('svg') as SVGSVGElement;
    expect(Number(svg.getAttribute('height'))).toBeLessThan(120);
    expect(svg.getAttribute('viewBox')).toMatch(/^0 \d+ \d+ \d+$/);
  });

  it('redraws when the score changes', () => {
    const before = fixture.nativeElement.innerHTML;
    fixture.componentRef.setInput('score', SCORE_REGISTRY[1].getScore('sib'));
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toEqual(before);
  });

  it('colours the SVG from CSS tokens rather than baked-in colours', () => {
    const group = fixture.nativeElement.querySelector('svg .vf-stavenote') as SVGElement;
    const ink = getComputedStyle(document.documentElement).getPropertyValue('--gillou-music-ink').trim();
    expect(ink).not.toBe('');
    expect(getComputedStyle(group).fill).toBe(hexToRgb(ink));
  });

  it('does not add to the history on its own', () => {
    expect(TestBed.inject(ScoreHistoryService).isHistoryEmpty()).toBeTrue();
  });
});
