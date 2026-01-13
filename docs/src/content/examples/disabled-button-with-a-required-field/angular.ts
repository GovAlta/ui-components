import { Component } from "@angular/core";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-disabled-button-with-required-field",
  templateUrl: "./angular.html"
})
export class DisabledButtonWithRequiredFieldComponent {
  inputValue = "";

  onInputChange(detail: GoabInputOnChangeDetail): void {
    this.inputValue = detail.value;
  }

  onConfirm(): void {
    // Handle form submission
    console.log("Form submitted with:", this.inputValue);
  }

  onCancel(): void {
    // Handle cancellation
    this.inputValue = "";
  }

  get isDisabled(): boolean {
    return this.inputValue.trim() === "";
  }
}
