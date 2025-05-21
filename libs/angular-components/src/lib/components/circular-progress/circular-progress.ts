import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
} from "@angular/core";

import {
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-circular-progress",
  template: `
    <goa-circular-progress
      [attr.variant]="variant"
      [attr.size]="size"
      [attr.message]="message"
      [attr.visible]="visible"
      [attr.progress]="progress"
      [attr.testid]="testId"
    >
    </goa-circular-progress>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCircularProgress {
  @Input() variant?: GoabCircularProgressVariant;
  @Input() size?: GoabCircularProgressSize;
  @Input() message?: string;
  @Input({ transform: booleanAttribute }) visible?: boolean;
  @Input({ transform: numberAttribute }) progress?: number;
  @Input() testId?: string;
}
