import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from "@angular/core";
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabPublicSubform extends GoabBaseComponent {
  @Input() id?: string = "";
  @Input() name?: string = "";
  @Input() continueMsg?: string = "";

  @Output() onInit = new EventEmitter<Event>();
  @Output() onStateChange = new EventEmitter<Event>();

  _onInit(e: Event) {
    this.onInit.emit(e);
  }

  _onStateChange(e: Event) {
    this.onStateChange.emit(e);
  }
}
