import { Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-details",
  template: `
    <goa-details
      [heading]="heading"
      [testid]="testId"
      [open]="open"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

    >
      <ng-content />
    </goa-details>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABDetails {
  @Input() heading?: string;
  @Input() testId?: string;
  @Input() open?: boolean;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

