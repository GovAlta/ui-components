import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-spinner",
  template: `
    <goa-spinner
      [attr.type]="type"
      [attr.size]="size"
      [attr.invert]="invert"
      [attr.progress]="progress"
      [attr.testid]="testId"
    >
    </goa-spinner>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSpinner {
  @Input() type?: GoabSpinnerType;
  @Input() size?: GoabSpinnerSize;
  @Input({ transform: booleanAttribute }) invert?: boolean;
  @Input({ transform: numberAttribute }) progress?: number;
  @Input() testId?: string;
}
