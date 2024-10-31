import { GoabTooltipHorizontalAlignment, GoabTooltipPosition, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-tooltip",
  template: `
    <goa-tooltip
      [attr.position]="position"
      [attr.content]="content"
      [attr.halign]="hAlign"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-tooltip>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabTooltip {
  @Input() position?: GoabTooltipPosition;
  @Input() content?: string;
  @Input() hAlign?: GoabTooltipHorizontalAlignment;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

