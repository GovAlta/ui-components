import { Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-grid",
  template: `
    <goa-grid
      [gap]="gap"
      [minchildwidth]="minChildWidth"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

    >
      <ng-content />
    </goa-grid>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABGrid {
  @Input({ required: true }) minChildWidth!: string;
  @Input() gap?: Spacing;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
