import { GoabPopoverPosition, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-popover",
  imports: [NgTemplateOutlet],
  template: `
    <goa-popover
      [attr.maxwidth]="maxWidth"
      [attr.minwidth]="minWidth"
      [attr.padded]="padded"
      [attr.position]="position"
      [attr.relative]="relative"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content></ng-content>
      <div slot="target">
        <ng-container [ngTemplateOutlet]="target"></ng-container>
      </div>
    </goa-popover>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPopover {
  @Input() maxWidth = "320px";
  @Input() minWidth?: string;
  @Input() padded = true;
  @Input() position?: GoabPopoverPosition;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  @Input() relative?: boolean;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
  @Input({ required: true }) target!: TemplateRef<any>;
}
