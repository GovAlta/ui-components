import { Component } from "@angular/core";
import {
  GoabButton, GoabButtonGroup, GoabFormItem, GoabInput,
} from "@abgov/angular-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-button",
  templateUrl: "./button.component.html",
  imports: [GoabButton, GoabButtonGroup, GoabFormItem, GoabInput],
})
export class DocsButtonComponent {
  inputValue = "";

  onInputChange(detail: GoabInputOnChangeDetail): void {
    this.inputValue = detail.value;
  }

  onConfirm(): void {
    console.log("Form submitted with:", this.inputValue);
  }

  onCancel(): void {
    this.inputValue = "";
  }

  get isDisabled(): boolean {
    return this.inputValue.trim() === "";
  }
}
