import { GoABFormItemLabelSize, GoABFormItemRequirement, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-item",
  template: `
    <goa-form-item
      [attr.label]="label"
      [attr.labelsize]="labelSize"
      [attr.helptext]="helpText"
      [attr.error]="error"
      [attr.data-testid]="testId"
      [id]="id"
      [attr.requirement]="requirement"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.mr]="mr"
      [attr.ml]="ml"
    >
      <ng-content />
    </goa-form-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABFormItem {
  @Input() label?: string;
  @Input() labelSize?: GoABFormItemLabelSize;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() requirement?: GoABFormItemRequirement;
  @Input() testId?: string;
  @Input() id?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() mr?: Spacing;
  @Input() ml?: Spacing;
}
