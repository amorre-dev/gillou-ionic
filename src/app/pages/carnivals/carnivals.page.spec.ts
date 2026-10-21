import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { CarnivalsPage } from './carnivals.page';

describe('CarnivalsPage', () => {
  let component: CarnivalsPage;
  let fixture: ComponentFixture<CarnivalsPage>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [CarnivalsPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    fixture = TestBed.createComponent(CarnivalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CarnivalsPage with saved carnivals', () => {
  it('lists saved carnivals newest first', async () => {
    localStorage.clear();
    localStorage.setItem(
      'savedCarnivals',
      JSON.stringify([
        { id: 'a', name: 'Premier', location: 'Binche', description: '', savedAt: '2026-02-01T10:00:00.000Z', entries: [] },
        { id: 'b', name: 'Second', location: '', description: '', savedAt: '2026-03-01T10:00:00.000Z', entries: [] },
      ])
    );
    await TestBed.configureTestingModule({
      imports: [CarnivalsPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    const fixture = TestBed.createComponent(CarnivalsPage);
    fixture.detectChanges();
    const names = Array.from(
      fixture.nativeElement.querySelectorAll('.carnival-card__name') as NodeListOf<HTMLElement>
    ).map((el) => el.textContent?.trim());
    expect(names).toEqual(['Second', 'Premier']);
  });
});
