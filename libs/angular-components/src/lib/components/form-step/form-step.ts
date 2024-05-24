import { ABGovFormStepStatus } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-form-step",
  template: `
    <goa-form-step
      [text]="text"
      [status]="status"
      [arialabel]="arialabel"
      [childindex]="childindex"
      [enabled]="enabled"
    >
      <ng-content />
    </goa-form-step>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovFormStep {
  @Input() text?: string;
  @Input() status?: ABGovFormStepStatus;
  @Input() arialabel?: string;
  @Input() childindex?: string;
  @Input() enabled?: boolean;
}

