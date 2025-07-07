import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  selector: "goab-public-form-task-list",
  standalone: true,
  template: `
  <goa-public-form-task-list
    [attr.heading]="heading"
    [attr.mt]="mt"
    [attr.mr]="mr"
    [attr.mb]="mb"
    [attr.ml]="ml"
  >
    <ng-content />
  </goa-public-form-task-list>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabPublicFormTaskList extends GoabBaseComponent {
  @Input() heading?: string;
}