import { GoABFormStepperOnChangeDetail, GoABFormStepperType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-stepper",
  template: `
    <goa-form-stepper
      [step]="step"
      [type]="type"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_change)="onchange($event)"
    >
      <ng-content />
    </goa-form-stepper>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABFormStepper {
  @Input() step?: number = -1;
  @Input() type?: GoABFormStepperType;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoABFormStepperOnChangeDetail>();

  onchange(e: Event) {
    const detail = (e as CustomEvent<GoABFormStepperOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
