import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  CheckboxCustomEvent,
  InputCustomEvent,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar,
  ModalController,
  TextareaCustomEvent,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { CarnivalDetails, SavedCarnival } from 'src/app/types/saved-carnival.type';
import { ScoreHistory } from 'src/app/types/score-history.type';
import { carnivalDateRange } from 'src/app/helpers/carnival-day.helper';

/** Result handed back by the modal when the user confirms. */
export interface CarnivalSaveResult {
  details: CarnivalDetails;
  clearHistory: boolean;
}

/**
 * Form to name a carnival before saving the current history, or to edit a saved one.
 * Pass `existing` to edit (the history options are then hidden).
 */
@Component({
  selector: 'app-carnival-save-modal',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonCheckbox,
    DatePipe,
  ],
  templateUrl: './carnival-save-modal.component.html',
  styleUrls: ['./carnival-save-modal.component.scss'],
})
export class CarnivalSaveModalComponent implements OnInit {
  private readonly modalCtrl = inject(ModalController);

  // Plain properties on purpose: ModalController assigns componentProps directly,
  // which would overwrite signal inputs with raw values.
  /** Carnival being edited, or undefined when saving the current history. */
  existing?: SavedCarnival;
  /** Entries about to be saved (ignored in edit mode). */
  entries: ScoreHistory[] = [];

  readonly name = signal('');
  readonly location = signal('');
  readonly description = signal('');
  readonly clearHistory = signal(true);

  readonly isEdit = signal(false);
  readonly canSave = computed(() => this.name().trim().length > 0);
  readonly range = signal<ReturnType<typeof carnivalDateRange>>(null);
  readonly entryCount = signal(0);

  constructor() {
    addIcons({ close });
  }

  ngOnInit() {
    this.isEdit.set(this.existing !== undefined);
    this.range.set(carnivalDateRange(this.entries));
    this.entryCount.set(this.entries.length);
    if (this.existing) {
      this.name.set(this.existing.name);
      this.location.set(this.existing.location);
      this.description.set(this.existing.description);
    }
  }

  onName(event: InputCustomEvent) {
    this.name.set(String(event.detail.value ?? ''));
  }

  onLocation(event: InputCustomEvent) {
    this.location.set(String(event.detail.value ?? ''));
  }

  onDescription(event: TextareaCustomEvent) {
    this.description.set(String(event.detail.value ?? ''));
  }

  onClearHistory(event: CheckboxCustomEvent) {
    this.clearHistory.set(event.detail.checked);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (!this.canSave()) {
      return;
    }
    const result: CarnivalSaveResult = {
      details: {
        name: this.name(),
        location: this.location(),
        description: this.description(),
      },
      clearHistory: !this.isEdit() && this.clearHistory(),
    };
    return this.modalCtrl.dismiss(result, 'save');
  }
}
