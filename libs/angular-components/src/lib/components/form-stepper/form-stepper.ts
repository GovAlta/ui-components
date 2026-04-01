import { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-form-stepper",
  template: `
    @if (isReady) {
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
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFormStepper extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() step?: number = -1;
  @Output() onChange = new EventEmitter<GoabFormStepperOnChangeDetail>();

  isReady = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabFormStepperOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
