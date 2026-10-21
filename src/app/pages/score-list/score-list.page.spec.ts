import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { ScoreListPage } from './score-list.page';
import { BADGE_COLORS, BADGE_MAX } from 'src/theme/badge.theme';

describe('ScoreListPage', () => {
  let component: ScoreListPage;
  let fixture: ComponentFixture<ScoreListPage>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ScoreListPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    fixture = TestBed.createComponent(ScoreListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ScoreListPage badges', () => {
  let page: ScoreListPage;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ScoreListPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    page = TestBed.createComponent(ScoreListPage).componentInstance;
  });

  it('renders one score per registry entry', () => {
    expect(page.scores().length).toBe(27);
  });

  it('colours badges from 0 to 10 and wraps beyond', () => {
    expect(page.getBadgeBackgroundColor(0)).toBe(BADGE_COLORS[0].code);
    expect(page.getBadgeBackgroundColor(10)).toBe(BADGE_MAX.code);
    expect(page.getBadgeBackgroundColor(11)).toBe(BADGE_MAX.code);
    expect(page.getBadgeTextColor(3)).toBe(BADGE_COLORS[3].text);
    expect(page.getBadgeTextColor(12)).toBe(BADGE_COLORS[2].code);
  });
});
