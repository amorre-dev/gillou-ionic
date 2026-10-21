import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  const freshService = (): ThemeService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(ThemeService);
  };

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('ion-palette-dark');
  });

  it('applies and remembers the theme the user toggles', () => {
    const service = freshService();
    const initial = service.isDarkMode();

    service.toggleTheme();

    expect(service.isDarkMode()).toBe(!initial);
    expect(document.documentElement.classList.contains('ion-palette-dark')).toBe(!initial);
    expect(freshService().isDarkMode()).toBe(!initial);
  });

  it('honours a stored preference over the system one', () => {
    localStorage.setItem('theme', 'dark');
    expect(freshService().isDarkMode()).toBeTrue();
    localStorage.setItem('theme', 'light');
    expect(freshService().isDarkMode()).toBeFalse();
  });
});
