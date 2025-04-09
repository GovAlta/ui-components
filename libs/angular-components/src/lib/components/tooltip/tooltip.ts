import {
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTooltip extends GoabBaseComponent {
  @Input() position?: GoabTooltipPosition;
  @Input() content?: string;
  @Input() hAlign?: GoabTooltipHorizontalAlignment;
}
