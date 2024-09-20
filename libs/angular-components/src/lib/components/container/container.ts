import { GoabContainerAccent, GoabContainerPadding, GoabContainerType, GoabContainerWidth, GoabIconSize, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-container",
  imports: [NgTemplateOutlet],
  template: `<goa-container
    [attr.type]="type"
    [attr.accent]="accent"
    [attr.padding]="padding"
    [attr.width]="width"
    [attr.maxwidth]="maxWidth"
    [attr.data-testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
  >
    <div slot="title">
      <ng-container [ngTemplateOutlet]="title"></ng-container>
    </div>
    <ng-content />
    <div slot="actions">
      <ng-container [ngTemplateOutlet]="actions"></ng-container>
    </div>
  </goa-container>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabContainer {
  @Input() type?: GoabContainerType = "interactive";
  @Input() accent?: GoabContainerAccent = "filled";
  @Input() padding?: GoabContainerPadding = "relaxed";
  @Input() width?: GoabContainerWidth = "full";
  @Input() maxWidth?: string;
  @Input() testId?: string;
  @Input() title!: TemplateRef<any>;
  @Input() actions!: TemplateRef<any>;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}

