import { ABGovFormItemLabelSize, ABGovFormItemRequirement, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-form-item",
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
export class ABGovFormItem {
  @Input() label?: string;
  @Input() labelSize?: ABGovFormItemLabelSize;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() requirement?: ABGovFormItemRequirement;
  @Input() id?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() mr?: Spacing;
  @Input() ml?: Spacing;
}


