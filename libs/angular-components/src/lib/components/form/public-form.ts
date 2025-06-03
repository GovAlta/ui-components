import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from "@angular/core";
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabPublicForm {
  @Input() status?: GoabPublicFormStatus = "complete";
  @Input() name?: string;

  @Output() onInit = new EventEmitter<Event>();
  @Output() onComplete = new EventEmitter<GoabFormState>();
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
