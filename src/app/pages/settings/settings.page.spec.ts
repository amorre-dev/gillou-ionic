import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(async () => {
    resetPersistenceForTests();
    await TestBed.configureTestingModule({
      imports: [SettingsPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
