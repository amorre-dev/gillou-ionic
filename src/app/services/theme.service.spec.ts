import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { resetPersistenceForTests, seedPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('ThemeService', () => {
  const freshService = (): ThemeService => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(ThemeService);
  };

  beforeEach(() => {
    resetPersistenceForTests();
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
    seedPersistenceForTests('theme', 'dark');
    expect(freshService().isDarkMode()).toBeTrue();
    seedPersistenceForTests('theme', 'light');
    expect(freshService().isDarkMode()).toBeFalse();
  });
});
