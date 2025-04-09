import {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
} from "@abgov/ui-components-common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-form-item",
  template: `
    <goa-form-item
      [attr.label]="label"
      [attr.labelsize]="labelSize"
      [attr.helptext]="helpText"
      [attr.error]="error"
      [attr.testid]="testId"
      [id]="id"
      [attr.requirement]="requirement"
      [attr.maxwidth]="maxWidth"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.mr]="mr"
      [attr.ml]="ml"
    >
      <ng-content />
      <ng-content select="goab-form-item-slot"></ng-content>
    </goa-form-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFormItem extends GoabBaseComponent {
  @Input() label?: string;
  @Input() labelSize?: GoabFormItemLabelSize;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() requirement?: GoabFormItemRequirement;
  @Input() maxWidth?: string;
  @Input() id?: string;
}
