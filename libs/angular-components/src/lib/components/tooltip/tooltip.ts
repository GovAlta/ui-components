import { GoABTooltipHorizontalAlignment, GoABTooltipPosition, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-tooltip",
  template: `
    <goa-tooltip
      [position]="position"
      [content]="content"
      [halign]="hAlign"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <ng-content />
    </goa-tooltip>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABTooltip {
  @Input() position?: GoABTooltipPosition;
  @Input() content?: string;
  @Input() hAlign?: GoABTooltipHorizontalAlignment;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

