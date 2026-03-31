import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  GoabFormDispatchOn,
  GoabFieldsetOnContinueDetail,
} from "@abgov/ui-components-common";

@Component({
  selector: "goab-fieldset",
  template: ` <goa-fieldset
    [attr.section-title]="sectionTitle"
    [attr.dispatch-on]="dispatchOn"
    [attr.id]="id"
    (_continue)="_onContinue($event)"
  >
    <ng-content></ng-content>
  </goa-fieldset>`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFieldset {
  /** Sets the id of the fieldset. */
  @Input() id?: string;
  /** Sets the section title displayed above the fieldset content. */
  @Input() sectionTitle?: string;
  /** Sets when changes will be dispatched to the form. @default "continue" */
  @Input() dispatchOn: GoabFormDispatchOn = "continue";

  /** Emits when the fieldset continues to the next step. Emits the continue detail. */
  @Output() onContinue = new EventEmitter<GoabFieldsetOnContinueDetail>();

  _onContinue(event: Event) {
    const detail = (event as CustomEvent).detail;
    this.onContinue.emit(detail);
  }
}
