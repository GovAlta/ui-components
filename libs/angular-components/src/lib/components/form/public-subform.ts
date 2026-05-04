import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  selector: "goab-public-subform",
  standalone: true,
  template: `
    <goa-public-subform
      [attr.id]="id"
      [attr.name]="name"
      [attr.continue-msg]="continueMsg"
      [attr.mt]="mt"
      [attr.mr]="mr"
      [attr.mb]="mb"
      [attr.ml]="ml"
      (_init)="_onInit($event)"
      (_stateChange)="_onStateChange($event)"
    >
      <ng-content />
    </goa-public-subform>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Container for form inputs and validation. */
export class GoabPublicSubform extends GoabBaseComponent {
  /** Sets the id of the subform. */
  @Input() id?: string = "";
  /** Sets the name identifier for the subform. */
  @Input() name?: string = "";
  /** Sets the text for the continue button. */
  @Input() continueMsg?: string = "";

  /** Emits when the subform is initialized. */
  @Output() onInit = new EventEmitter<Event>();
  /** Emits when the subform state changes. */
  @Output() onStateChange = new EventEmitter<Event>();

  _onInit(e: Event) {
    this.onInit.emit(e);
  }

  _onStateChange(e: Event) {
    this.onStateChange.emit(e);
  }
}
