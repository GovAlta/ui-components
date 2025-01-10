import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-card",
  template: `
    <goa-card
      [attr.elevation]="elevation"
      [attr.width]="width"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-card>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCard {
  @Input() elevation?: number;
  @Input() width?: string;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
