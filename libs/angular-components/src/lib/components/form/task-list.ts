import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";

@Component({
  selector: "goab-public-form-task-list",
  standalone: true,
  template: `
  <goa-public-form-task-list
    [attr.heading]="heading"
  >
    <ng-content />
  </goa-public-form-task-list>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabPublicFormTaskList {
  @Input() heading?: string;
}