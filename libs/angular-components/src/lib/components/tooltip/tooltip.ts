import { ABGovTooltipHorizontalAlignment, ABGovTooltipPosition, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-tooltip",
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
export class ABGovTooltip {
  @Input() position?: ABGovTooltipPosition;
  @Input() content?: string;
  @Input() hAlign?: ABGovTooltipHorizontalAlignment;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

