import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular';
import { ReorderScoresPage } from './reorder-scores.page';
import { resetPersistenceForTests } from 'src/app/helpers/storage.helper';

describe('ReorderScoresPage', () => {
  let component: ReorderScoresPage;
  let fixture: ComponentFixture<ReorderScoresPage>;

  beforeEach(async () => {
    resetPersistenceForTests();
    await TestBed.configureTestingModule({
      imports: [ReorderScoresPage],
      providers: [provideRouter([]), provideIonicAngular()],
    }).compileComponents();
    fixture = TestBed.createComponent(ReorderScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
