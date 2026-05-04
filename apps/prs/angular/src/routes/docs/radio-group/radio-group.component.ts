import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  GoabDatePicker,
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/angular-components";
import type { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-radio-group",
  templateUrl: "./radio-group.component.html",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoabDatePicker,
    GoabFormItem,
    GoabRadioGroup,
    GoabRadioItem,
  ],
})
export class DocsRadioGroupComponent {
  private fb = inject(FormBuilder);

  // Basic example - Reactive forms pattern
  basicForm: FormGroup = this.fb.group({
    contact: [""],
  });

  // Basic example - Template driven (ngModel) pattern
  ngModelContact = "";

  radioOnChange(event: GoabRadioGroupOnChangeDetail): void {
    this.ngModelContact = event.value as string;
  }

  handleDateChange(): void {
    // no-op for demo
  }
}
