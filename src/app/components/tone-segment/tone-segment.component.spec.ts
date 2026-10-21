import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';
import { ToneSegmentComponent } from './tone-segment.component';
import { ScoreService } from 'src/app/services/score.service';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('ToneSegmentComponent', () => {
  let fixture: ComponentFixture<ToneSegmentComponent>;
  let scoreService: ScoreService;

  beforeEach(async () => {
    resetPersistenceForTests();
    await TestBed.configureTestingModule({
      imports: [ToneSegmentComponent],
      providers: [provideIonicAngular()],
    }).compileComponents();
    scoreService = TestBed.inject(ScoreService);
    fixture = TestBed.createComponent(ToneSegmentComponent);
    fixture.detectChanges();
  });

  it('offers both tones with labels, icons only when compact', () => {
    expect(fixture.nativeElement.querySelectorAll('ion-segment-button').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('ion-label').length).toBe(2);

    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('ion-label').length).toBe(0);
    expect(fixture.nativeElement.querySelectorAll('ion-icon').length).toBe(2);
  });

  it('switches the tone when a segment is chosen', () => {
    fixture.componentInstance.onChange({ detail: { value: 'mib' } } as never);
    expect(scoreService.tone()).toBe('mib');
    fixture.componentInstance.onChange({ detail: { value: 'nope' } } as never);
    expect(scoreService.tone()).toBe('mib');
    fixture.componentInstance.onChange({ detail: { value: 'sib' } } as never);
    expect(scoreService.tone()).toBe('sib');
  });
});
