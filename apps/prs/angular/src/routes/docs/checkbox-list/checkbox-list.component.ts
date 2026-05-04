import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabCheckbox, GoabCheckboxList, GoabFormItem, GoabTextArea,
} from "@abgov/angular-components";
import type { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";

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

  checkboxListOnChange(event: GoabCheckboxListOnChangeDetail): void {
    console.log(event);
  }
}
