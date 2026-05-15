import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { GoabFormItem, GoabTextArea } from "@abgov/angular-components";
import type { GoabTextAreaOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-text-area",
  templateUrl: "./text-area.component.html",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoabFormItem,
    GoabTextArea,
  ],
})
export class DocsTextAreaComponent {
  private fb = inject(FormBuilder);

  // Basic example - Reactive forms pattern
  basicForm: FormGroup = this.fb.group({
    comments: [""],
  });

  // Basic example - Template driven (ngModel) pattern
  ngModelComments = "";

  textareaOnChange(event: GoabTextAreaOnChangeDetail): void {
    this.ngModelComments = event.value;
  }
}
