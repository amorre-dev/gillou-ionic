import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should list the five menu entries', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // Stencil patches textContent on slotted Ionic components, so read innerHTML.
    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('ion-label') as NodeListOf<HTMLElement>
    ).map((label) => label.innerHTML);
    expect(labels.length).toEqual(5);
    expect(labels[0]).toContain('Annonces');
    expect(labels[3]).toContain('Carnavals');
    expect(labels[4]).toContain('Options');
  });
});
