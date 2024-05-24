import { GoABButtonGroupAlignment, GoABButtonGroupGap, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-button-group",
  template: `
    <goa-button-group
      [alignment]="alignment"
      [gap]="gap"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <ng-content />
    </goa-button-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABButtonGroup {
  @Input() alignment?: GoABButtonGroupAlignment;
  @Input() gap?: GoABButtonGroupGap;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
