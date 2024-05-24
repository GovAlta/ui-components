import { GoABBlockAlignment, GoABBlockDirection, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-block",
  template: `
    <goa-block
      [gap]="gap"
      [direction]="direction"
      [alignment]="alignment"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <ng-content />
    </goa-block>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABBlock {
  @Input() gap?: Spacing;
  @Input() direction?: GoABBlockDirection;
  @Input() alignment?: GoABBlockAlignment;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
