import { GoabButtonType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-multi-action-button",
  template: `
    <goa-multi-action-button
      [attr.text]="text"
      [attr.type]="type"
    >
      <ng-content></ng-content>
    </goa-multi-action-button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabMultiActionButton {
  @Input() text?: string;
  @Input() type?: GoabButtonType;
}
