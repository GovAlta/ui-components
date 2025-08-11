import {
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { CommonModule, NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-tooltip",
  imports: [CommonModule, NgTemplateOutlet],
  template: `
    <goa-tooltip
      [attr.position]="position"
      [attr.content]="tooltipContent ? null : content"
      [attr.halign]="hAlign"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
      <div slot="content" *ngIf="tooltipContent">
        <ng-container [ngTemplateOutlet]="tooltipContent"></ng-container>
      </div>
    </goa-tooltip>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTooltip extends GoabBaseComponent {
  @Input() position?: GoabTooltipPosition;
  @Input() content?: string;
  @Input() hAlign?: GoabTooltipHorizontalAlignment;
  @Input() tooltipContent?: TemplateRef<unknown>;
}
