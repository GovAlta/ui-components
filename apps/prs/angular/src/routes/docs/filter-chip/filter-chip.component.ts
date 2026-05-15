import { Component } from "@angular/core";
import {
  GoabBlock, GoabButton, GoabFilterChip, GoabFormItem, GoabInput,
} from "@abgov/angular-components";
import type {
  GoabInputOnChangeDetail, GoabInputOnKeyPressDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-filter-chip",
  templateUrl: "./filter-chip.component.html",
  imports: [GoabBlock, GoabButton, GoabFilterChip, GoabFormItem, GoabInput],
})
export class DocsFilterChipComponent {
  activeFilters: string[] = [];
  chips: string[] = ["Chip 1", "Chip 2", "Chip 3"];
  typedChips: string[] = [];
  inputValue = "";

  handleToggle(): void {
    console.log("toggled");
  }

  setFilter(filter: string): void {
    console.log("filter:", filter);
  }

  addFilter(): void {
    const randomFilter = "Filter " + Math.floor(Math.random() * 100);
    if (!this.activeFilters.includes(randomFilter)) {
      this.activeFilters.push(randomFilter);
    }
  }

  removeFilter(filter: string): void {
    this.activeFilters = this.activeFilters.filter((f) => f !== filter);
  }

  deleteChip(chip: string): void {
    this.chips = this.chips.filter((c) => c !== chip);
  }

  handleInputChange(detail: GoabInputOnChangeDetail): void {
    this.inputValue = detail.value.trim();
  }

  handleInputKeyPress(detail: GoabInputOnKeyPressDetail): void {
    const newValue = detail.value.trim();
    if (detail.key === "Enter" && newValue !== "") {
      this.addChip();
    } else if (!this.inputValue && this.typedChips.length > 0 && detail.key === "Backspace") {
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
