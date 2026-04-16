import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { GoabFormState, GoabPublicFormStatus } from "@abgov/ui-components-common";

@Component({
  selector: "goab-public-form",
  standalone: true,
  template: `
    <goa-public-form
      [attr.status]="status"
      [attr.name]="name"
      (_init)="_onInit($event)"
      (_complete)="_onComplete($event)"
      (_stateChange)="_onStateChange($event)"
    >
      <ng-content />
    </goa-public-form>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Container for form inputs and validation. */
export class GoabPublicForm {
  /** The initialization status of the form. Set to "initializing" while loading external state, then "complete" when ready. @default "complete" */
  @Input() status?: GoabPublicFormStatus = "complete";
  /** A name identifier for the form. Useful for debugging complex forms with multiple nested forms. */
  @Input() name?: string;

  /** Emits when the form is initialized. */
  @Output() onInit = new EventEmitter<Event>();
  /** Emits when the form is complete. Emits the form state. */
  @Output() onComplete = new EventEmitter<GoabFormState>();
  /** Emits when the form state changes. Emits the updated form state. */
  @Output() onStateChange = new EventEmitter<GoabFormState>();

  _onInit(e: Event) {
    this.onInit.emit(e);
  }

  _onComplete(e: Event) {
    const detail = (e as CustomEvent).detail;
    this.onComplete.emit(detail);
  }

  _onStateChange(e: Event) {
    const detail = (e as CustomEvent).detail;
    this.onStateChange.emit(detail.data);
  }
}
