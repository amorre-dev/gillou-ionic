import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, provideIonicAngular } from '@ionic/angular';
import { CarnivalSaveModalComponent } from './carnival-save-modal.component';

describe('CarnivalSaveModalComponent', () => {
  let fixture: ComponentFixture<CarnivalSaveModalComponent>;
  let dismiss: jasmine.Spy;

  beforeEach(async () => {
    dismiss = jasmine.createSpy('dismiss').and.resolveTo(true);
    await TestBed.configureTestingModule({
      imports: [CarnivalSaveModalComponent],
      providers: [provideIonicAngular(), { provide: ModalController, useValue: { dismiss } }],
    }).compileComponents();
    fixture = TestBed.createComponent(CarnivalSaveModalComponent);
    fixture.detectChanges();
  });

  it('requires a name before saving', () => {
    const component = fixture.componentInstance;
    expect(component.canSave()).toBeFalse();
    component.save();
    expect(dismiss).not.toHaveBeenCalled();

    component.name.set('Binche 2026');
    component.location.set('Binche');
    component.save();
    expect(dismiss).toHaveBeenCalledWith(
      {
        details: { name: 'Binche 2026', location: 'Binche', description: '' },
        clearHistory: true,
      },
      'save'
    );
  });

  it('prefills and never clears the history in edit mode', () => {
    fixture.componentInstance.existing = {
      id: 'x',
      name: 'Ancien',
      location: 'Là',
      description: 'Note',
      savedAt: '2026-02-16T10:00:00.000Z',
      entries: [],
    };
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    expect(fixture.componentInstance.isEdit()).toBeTrue();
    expect(fixture.componentInstance.name()).toBe('Ancien');
    fixture.componentInstance.save();
    expect(dismiss.calls.mostRecent().args[0].clearHistory).toBeFalse();
  });
});
