import { Component } from "@angular/core";
import type {
  GoabInputOnChangeDetail,
  GoabInputOnKeyPressDetail,
} from "@abgov/ui-components-common";

@Component({
  selector: "app-type-to-create-a-new-filter",
  templateUrl: "./angular.html",
})
export class TypeToCreateANewFilterComponent {
  typedChips: string[] = [];
  inputValue = "";

  handleInputChange(detail: GoabInputOnChangeDetail): void {
    const newValue = detail.value.trim();
    this.inputValue = newValue;
  }

  handleInputKeyPress(detail: GoabInputOnKeyPressDetail): void {
    const newValue = detail.value.trim();
    if (detail.key === "Enter" && newValue !== "") {
      this.addChip();
    } else if (
      !this.inputValue &&
      this.typedChips.length > 0 &&
      detail.key === "Backspace"
    ) {
      this.typedChips.pop();
    }
  }

  addChip(): void {
    if (this.inputValue.trim()) {
      this.typedChips.push(this.inputValue.trim());
      this.inputValue = "";
    }
  }

  removeTypedChip(chip: string): void {
    this.typedChips = this.typedChips.filter((c) => c !== chip);
  }
}
