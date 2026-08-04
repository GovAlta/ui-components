import {
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
} from "@abgov/angular-components";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "abgov-docs-dropdown-multiselect",
  templateUrl: "./dropdown-multiselect.component.html",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoabDropdownItem,
    GoabDropdownMultiselect,
    GoabFormItem,
  ],
})
export class DocsDropdownMultiselectComponent {
  form!: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      fruits: [[] as string[]],
      services: [[] as string[]],
      cities: [[] as string[]],
      departments: [[] as string[]],
      sizeDefault: [[] as string[]],
      sizeCompact: [[] as string[]],
      disabled: [{ value: [] as string[], disabled: true }],
      errorValue: [[] as string[]],
    });
  }
}
