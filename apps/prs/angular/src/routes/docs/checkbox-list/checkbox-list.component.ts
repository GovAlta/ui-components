import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabCheckbox, GoabCheckboxList, GoabFormItem, GoabTextArea,
} from "@abgov/angular-components";
import type {
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-checkbox-list",
  templateUrl: "./checkbox-list.component.html",
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    GoabCheckbox, GoabCheckboxList, GoabFormItem, GoabTextArea,
  ],
})
export class DocsCheckboxListComponent {
  basicForm = new FormGroup({
    interests: new FormControl<string[]>([]),
  });

  ngModelInterests: string[] = [];
  readonly selectAllOptions = ["email", "text", "push"];
  selectAllValues: string[] = [];

  get allOptionsSelected(): boolean {
    return this.selectAllValues.length === this.selectAllOptions.length;
  }

  get someOptionsSelected(): boolean {
    return this.selectAllValues.length > 0 && !this.allOptionsSelected;
  }

  checkboxListOnChange(event: GoabCheckboxListOnChangeDetail): void {
    console.log(event);
  }

  selectAllOnChange(event: GoabCheckboxOnChangeDetail): void {
    this.selectAllValues = event.checked ? [...this.selectAllOptions] : [];
  }

  selectAllListOnChange(event: GoabCheckboxListOnChangeDetail): void {
    this.selectAllValues = event.value;
  }
}
