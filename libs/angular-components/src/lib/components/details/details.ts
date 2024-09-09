import { Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-details",
  template: `
    <goa-details
      [attr.heading]="heading"
      [attr.data-testid]="testId"
      [attr.open]="open"
      [attr.maxwidth]="maxWidth"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-details>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabDetails {
  @Input() heading?: string;
  @Input() testId?: string;
  @Input() open?: boolean;
  @Input() maxWidth?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

