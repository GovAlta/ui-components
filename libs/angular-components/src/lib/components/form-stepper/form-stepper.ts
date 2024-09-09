import { GoabFormStepperOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-stepper",
  template: `
    <goa-form-stepper
      [attr.step]="step"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="onchange($event)"
    >
      <ng-content />
    </goa-form-stepper>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabFormStepper {
  @Input() step?: number = -1;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoabFormStepperOnChangeDetail>();

  onchange(e: Event) {
    const detail = (e as CustomEvent<GoabFormStepperOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
