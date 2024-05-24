import { GoABFormItemLabelSize, GoABFormItemRequirement, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-item",
  template: `
    <goa-form-item
      [label]="label"
      [labelsize]="labelSize"
      [helptext]="helpText"
      [error]="error"
      [requirement]="requirement"
      [id]="id"
      [mt]="mt"
      [mb]="mb"
      [mr]="mr"
      [ml]="ml"
    >
      <ng-content />
    </goa-form-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABFormItem {
  @Input() label?: string;
  @Input() labelSize?: GoABFormItemLabelSize;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() requirement?: GoABFormItemRequirement;
  @Input() id?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() mr?: Spacing;
  @Input() ml?: Spacing;
}


