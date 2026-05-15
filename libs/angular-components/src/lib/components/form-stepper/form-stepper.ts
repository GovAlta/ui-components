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
/** Provides a visual representation of a form through a series of steps. */
export class GoabFormStepper extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** The current step state value (1-based index). Leaving it blank (-1) will allow any step to be accessed. @default -1 */
  @Input() step?: number = -1;
  /** Emits when the form stepper step changes. Emits the new step as GoabFormStepperOnChangeDetail. */
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
