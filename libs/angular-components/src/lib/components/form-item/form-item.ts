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
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-form-item",
  template: `
    <goa-form-item
      *ngIf="isReady"
      [attr.label]="label"
      [attr.labelsize]="labelSize"
      [attr.helptext]="helpText"
      [attr.error]="error"
      [attr.testid]="testId"
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
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabFormItem extends GoabBaseComponent implements OnInit {
  @Input() label?: string;
  @Input() labelSize?: GoabFormItemLabelSize;
  @Input() helpText?: string;
  @Input() error?: string;
  @Input() requirement?: GoabFormItemRequirement;
  @Input() maxWidth?: string;
  @Input() id?: string;
  /**
   * Public form: to arrange fields in the summary
   */
  @Input() publicFormSummaryOrder?: number;
  /**
   * Public form: allow to override the label value within the form-summary to provide a shorter description of the value
   */
  @Input() name?: string;

  isReady = false;

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
