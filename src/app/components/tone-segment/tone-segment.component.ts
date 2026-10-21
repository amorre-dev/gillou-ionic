import { Component, inject, input } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  SegmentCustomEvent,
} from '@ionic/angular';
import { ScoreService, Tone } from 'src/app/services/score.service';

/** Si♭ / Mi♭ chooser: a two-option segmented pill, one instrument per option. */
@Component({
  selector: 'app-tone-segment',
  standalone: true,
  imports: [IonSegment, IonSegmentButton, IonIcon, IonLabel],
  templateUrl: './tone-segment.component.html',
  styleUrls: ['./tone-segment.component.scss'],
})
export class ToneSegmentComponent {
  private readonly scoreService = inject(ScoreService);

  /** Icons only, for narrow toolbars. */
  readonly compact = input(false);

  readonly tone = this.scoreService.tone;

  onChange(event: SegmentCustomEvent) {
    const value = event.detail.value;
    if (value === 'sib' || value === 'mib') {
      this.scoreService.setTone(value as Tone);
    }
  }
}
