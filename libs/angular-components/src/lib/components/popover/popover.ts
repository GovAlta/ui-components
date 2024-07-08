import { GoABPopoverPosition, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-popover",
  template: `
    <goa-popover
      [attr.maxwidth]="maxWidth"
      [attr.minwidth]="minWidth"
      [attr.padded]="padded"
      [attr.position]="position"
      [attr.relative]="relative"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-popover>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABPopover {
  @Input() maxWidth = "320px";
  @Input() minWidth?: string;
  @Input() padded = true;
  @Input() position?: GoABPopoverPosition;
  @Input() relative?: boolean;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
