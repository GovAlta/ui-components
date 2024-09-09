import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-spinner",
  template: `
    <goa-spinner
      [attr.type]="type"
      [attr.size]="size"
      [attr.invert]="invert"
      [attr.progress]="progress"
      [attr.data-testid]="testId"
    >
    </goa-spinner>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabSpinner {
  @Input() type?: GoabSpinnerType;
  @Input() size?: GoabSpinnerSize;
  @Input() invert?: boolean;
  @Input() progress?: number;
  @Input() testId?: string;
}
