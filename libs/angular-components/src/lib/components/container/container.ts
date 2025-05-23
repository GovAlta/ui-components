import {
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

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
    [attr.testid]="testId"
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
export class GoabContainer extends GoabBaseComponent {
  @Input() type?: GoabContainerType = "interactive";
  @Input() accent?: GoabContainerAccent = "filled";
  @Input() padding?: GoabContainerPadding = "relaxed";
  @Input() width?: GoabContainerWidth = "full";
  @Input() maxWidth?: string;
  @Input() title!: TemplateRef<any>;
  @Input() actions!: TemplateRef<any>;
}
