import { ABGovFormStepperOnChangeDetail, ABGovFormStepperType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-form-stepper",
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
export class ABGovFormStepper {
  @Input() step?: number;
  @Input() type?: ABGovFormStepperType;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<ABGovFormStepperOnChangeDetail>();

  onchange(e: Event) {
    const detail = (e as CustomEvent<ABGovFormStepperOnChangeDetail>).detail;
    // this.step = detail.step; // TODO: is this needed!!!!!!!!!
    this.onChange.emit(detail);
  }
}
