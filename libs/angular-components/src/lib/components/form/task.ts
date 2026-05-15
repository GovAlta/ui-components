import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";

@Component({
  selector: "goab-public-form-task",
  standalone: true,
  template: `
    <goa-public-form-task [attr.status]="status">
      <ng-content />
    </goa-public-form-task>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Container for form inputs and validation. */
export class GoabPublicFormTask {
  /** Sets the status of the task, which determines its badge display. */
  @Input() status?: GoabPublicFormTaskStatus;
}
