import {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
} from "@abgov/ui-components-common";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";
import { GoabFormItemType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goabx-form-item",
  template: `@if (isReady) {
    <goa-form-item
      [attr.version]="version"
      [attr.label]="label"
      [attr.labelsize]="labelSize"
      [attr.helptext]="helpText"
      [attr.error]="error"
      [attr.testid]="testId"
      [attr.type]="type"
      [id]="id"
      [attr.name]="name"
      [attr.requirement]="requirement"
      [attr.maxwidth]="maxWidth"
      [attr.public-form-summary-order]="publicFormSummaryOrder"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.mr]="mr"
      [attr.ml]="ml"
    >
      <ng-content />
      <ng-content select="goab-form-item-slot"></ng-content>
    </goa-form-item>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxFormItem extends GoabBaseComponent implements OnInit {
  /**
   * Creates a label for the form item.
   * @default ""
   */
  @Input() label?: string;
  /**
   * Sets the label size. 'compact' for dense layouts, 'regular' for standard, 'large' for emphasis.
   * @default "regular"
   */
  @Input() labelSize?: GoabFormItemLabelSize;
  /**
   * Help text displayed under the form field to provide additional explanation.
   * @default ""
   */
  @Input() helpText?: string;
  /**
   * Error text displayed under the form field. Leave blank to indicate a valid field.
   * @default ""
   */
  @Input() error?: string;
  /**
   * Marks the field with an optional or required label indicator.
   * @default ""
   */
  @Input() requirement?: GoabFormItemRequirement;
  /**
   * Sets the maximum width of the form item.
   * @default "none"
   */
  @Input() maxWidth?: string;
  @Input() id?: string;
  /**
   * Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group.
   * @default ""
   */
  @Input() type?: GoabFormItemType = "";
  /**
   * Public form: to arrange fields in the summary
   */
  @Input() publicFormSummaryOrder?: number;
  /**
   * Public form: allow to override the label value within the form-summary to provide a shorter description of the value
   */
  @Input() name?: string;

  isReady = false;
  version = "2";

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
