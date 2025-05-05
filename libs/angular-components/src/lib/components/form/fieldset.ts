import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from "@angular/core";
import { GoabFormDispatchOn, GoabFieldsetOnChangeDetail, GoabFieldsetOnContinueDetail } from "@abgov/ui-components-common";

@Component({
  selector: 'goab-fieldset',
  template: `
    <goa-fieldset
      [attr.section-title]="sectionTitle"
      [attr.dispatch-on]="dispatchOn"
      [attr.id]="id"
      (_change)="_onChange($event)"
      (_continue)="_onContinue($event)"
    >
      <ng-content></ng-content>
    </goa-fieldset>`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFieldset {
  @Input() id?: string;
  @Input() sectionTitle?: string;
  @Input() dispatchOn: GoabFormDispatchOn = "continue";

  @Output() onChange = new EventEmitter<GoabFieldsetOnChangeDetail>();
  @Output() onContinue = new EventEmitter<GoabFieldsetOnContinueDetail>();

  _onChange(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.onChange.emit(detail);
  }

  _onContinue(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.onContinue.emit(detail);
  }
}
