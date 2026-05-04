import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabCheckbox, GoabCheckboxList, GoabFormItem, GoabInput, GoabRadioGroup, GoabRadioItem,
} from "@abgov/angular-components";
import type {
  GoabCheckboxListOnChangeDetail, GoabCheckboxOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-checkbox",
  templateUrl: "./checkbox.component.html",
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    GoabCheckbox, GoabCheckboxList, GoabFormItem, GoabInput, GoabRadioGroup, GoabRadioItem,
  ],
})
export class DocsCheckboxComponent {
  private fb = inject(FormBuilder);

  basicForm = new FormGroup({
    item: new FormControl(false),
  });

  ngModelItem = false;

  revealForm: FormGroup = this.fb.group({
    contactMethod: [""],
    contactMethods: [[] as string[]],
    phoneNumber: [""],
    emailAddress: [""],
  });
  selectedOptions: string[] = [];

  checkboxOnChange(event: GoabCheckboxOnChangeDetail): void {
    console.log(event);
    this.ngModelItem = event.checked;
  }

  onSelectionChange(event: GoabCheckboxListOnChangeDetail): void {
    this.selectedOptions = event.value;
  }
}
