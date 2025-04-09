import { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";

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
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-form-stepper>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFormStepper extends GoabBaseComponent {
  @Input() step?: number = -1;

  @Output() onChange = new EventEmitter<GoabFormStepperOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabFormStepperOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
