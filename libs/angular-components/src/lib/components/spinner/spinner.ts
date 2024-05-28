import { GoABSpinnerSize, GoABSpinnerType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-spinner",
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
export class GoABSpinner {
  type?: GoABSpinnerType;
  size?: GoABSpinnerSize;
  invert?: boolean;
  progress?: number;
  testId?: string;
}
