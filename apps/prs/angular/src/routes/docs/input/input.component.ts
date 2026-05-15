import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { GoabBlock, GoabFormItem, GoabInput } from "@abgov/angular-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-input",
  templateUrl: "./input.component.html",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoabBlock,
    GoabFormItem,
    GoabInput,
  ],
})
export class DocsInputComponent {
  private fb = inject(FormBuilder);

  // Basic example - Reactive forms pattern
  basicForm: FormGroup = this.fb.group({
    fullName: [""],
  });

  // Basic example - Template driven (ngModel) pattern
  ngModelFullName = "";

  // Clearable example
  search = "";

  // Examples - Indian registration number
  indianRegForm: FormGroup = this.fb.group({
    bandNo: [""],
    family: [""],
    position: [""],
  });

  // Examples - Dollar amounts
  costFormGroup: FormGroup = this.fb.group({
    tuitionFeeAmount: [""],
    suppliesAmount: [""],
    othersAmount: [""],
  });

  inputOnChange(event: GoabInputOnChangeDetail): void {
    this.ngModelFullName = event.value;
  }

  clearableChange(event: GoabInputOnChangeDetail): void {
    this.search = event.value;
  }

  clearSearch(): void {
    this.search = "";
  }
}
