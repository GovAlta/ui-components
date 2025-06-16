import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { GoabPublicFormTaskStatus } from "@abgov/ui-components-common";

@Component({
  selector: "goab-public-form-task",
  standalone: true,
  template: `
  <goa-public-form-task
    [attr.status]="status"
  >
    <ng-content />
  </goa-public-form-task>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabPublicFormTask {
  @Input() status?: GoabPublicFormTaskStatus;
}