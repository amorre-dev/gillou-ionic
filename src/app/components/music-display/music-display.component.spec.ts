import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MusicDisplayComponent } from './music-display.component';

describe('MusicDisplayComponent', () => {
  let component: MusicDisplayComponent;
  let fixture: ComponentFixture<MusicDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MusicDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
