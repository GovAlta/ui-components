import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabButton, GoabButtonGroup, GoabDatePicker, GoabFormItem,
} from "@abgov/angular-components";
import type { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-date-picker",
  templateUrl: "./date-picker.component.html",
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    GoabButton, GoabButtonGroup, GoabDatePicker, GoabFormItem,
  ],
})
export class DocsDatePickerComponent {
  private fb = inject(FormBuilder);

  basicForm = new FormGroup({
    date: new FormControl<string | null>(null),
  });

  ngModelDate: string | undefined;

  withValueForm: FormGroup = this.fb.group({
    startDate: ["2024-01-15"],
  });
  rangeForm: FormGroup = this.fb.group({
    appointment: [null],
  });
  inputTypeForm: FormGroup = this.fb.group({
    incident: [null],
    birthday: [null],
  });
  statesForm: FormGroup = this.fb.group({
    locked: [{ value: "2024-01-01", disabled: true }],
    errorDate: [null],
  });

  // Examples
  exampleBirthday: string | undefined;
  resetItem: string | undefined;

  onDateChange(event: GoabDatePickerOnChangeDetail): void {
    this.ngModelDate = event.valueStr || undefined;
  }

  onBirthdayChange(event: GoabDatePickerOnChangeDetail): void {
    this.exampleBirthday = event.valueStr || undefined;
  }

  onResetChange(event: GoabDatePickerOnChangeDetail): void {
    this.resetItem = event.valueStr || undefined;
  }

  setResetValue(): void {
    this.resetItem = "2024-01-15";
  }

  clearResetValue(): void {
    this.resetItem = undefined;
  }
}
