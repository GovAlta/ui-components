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
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";
import { GoabFormItemType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-form-item",
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
/** Wraps an input control with a text label, requirement label, helper text, and error text. */
export class GoabFormItem extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Creates a label for the form item. */
  @Input() label?: string;
  /** Sets the label size. 'regular' for standard, 'large' for emphasis. */
  @Input() labelSize?: GoabFormItemLabelSize;
  /** Help text displayed under the form field to provide additional explanation. */
  @Input() helpText?: string;
  /** Error text displayed under the form field. Leave blank to indicate a valid field. */
  @Input() error?: string;
  /** Marks the field with an optional or required label indicator. */
  @Input() requirement?: GoabFormItemRequirement;
  /** Sets the maximum width of the form item. */
  @Input() maxWidth?: string;
  /** Sets the id attribute on the form item element. */
  @Input() id?: string;
  /** Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group. */
  @Input() type?: GoabFormItemType = "";
  /** Sets the display order within the form summary. For public-form use only. */
  @Input() publicFormSummaryOrder?: number;
  /** Overrides the label value within the form-summary to provide a shorter description. For public-form use only. */
  @Input() name?: string;

  isReady = false;
  version = "2";

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
