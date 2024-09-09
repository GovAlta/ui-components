import { GoabFormStepStatus } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-step",
  template: `
    <goa-form-step
      [attr.text]="text"
      [attr.status]="status"
    ></goa-form-step> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFormStep {
  @Input() text?: string;
  @Input() status?: GoabFormStepStatus;
}
