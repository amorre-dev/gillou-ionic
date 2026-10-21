import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { CarnivalDetailPage } from './carnival-detail.page';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('CarnivalDetailPage', () => {
  let component: CarnivalDetailPage;
  let fixture: ComponentFixture<CarnivalDetailPage>;

  beforeEach(async () => {
    resetPersistenceForTests();
    await TestBed.configureTestingModule({
      imports: [CarnivalDetailPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    fixture = TestBed.createComponent(CarnivalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
