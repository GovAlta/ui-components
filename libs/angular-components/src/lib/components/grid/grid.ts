import { Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-grid",
  template: `
    <goa-grid
      [attr.gap]="gap"
      [attr.minchildwidth]="minChildWidth"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-grid>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabGrid {
  @Input({ required: true }) minChildWidth!: string;
  @Input() gap?: Spacing;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
