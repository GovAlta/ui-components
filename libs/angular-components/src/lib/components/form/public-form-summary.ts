import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";

@Component({
  selector: "goab-public-form-summary",
  standalone: true,
  template: `
  <goa-public-form-summary
    [attr.heading]="heading"
  >
    <ng-content />
  </goa-public-form-summary>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabPublicFormSummary {
  @Input() heading?: string;
}
