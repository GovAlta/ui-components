import { ABGovSpinnerSize, ABGovSpinnerType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-spinner",
  template: `
    <goa-spinner
      [type]="type"
      [size]="size"
      [invert]="invert"
      [progress]="progress"
      [testid]="testId"
    >
    </goa-spinner>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovSpinner {
  type?: ABGovSpinnerType;
  size?: ABGovSpinnerSize;
  invert?: boolean;
  progress?: number;
  testId?: string;
}
