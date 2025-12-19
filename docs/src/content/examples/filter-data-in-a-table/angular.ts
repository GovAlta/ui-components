import { Component } from "@angular/core";
import type {
  GoabBadgeType,
  GoabInputOnChangeDetail,
  GoabInputOnKeyPressDetail,
} from "@abgov/ui-components-common";

interface DataItem {
  status: { type: GoabBadgeType; text: string };
  name: string;
  id: string;
}

@Component({
  selector: "app-filter-data-in-table",
  templateUrl: "./angular.html"
})
export class FilterDataInTableComponent {
  typedChips: string[] = [];
  inputValue = "";
  inputError = "";
  readonly errorEmpty = "Empty filter";
  readonly errorDuplicate = "Enter a unique filter";

  readonly data: DataItem[] = [
    {
      status: { type: "information", text: "In progress" },
      name: "Ivan Schmidt",
      id: "7838576954",
    },
    {
      status: { type: "success", text: "Completed" },
      name: "Luz Lakin",
      id: "8576953364",
    },
    {
      status: { type: "information", text: "In progress" },
      name: "Keith McGlynn",
      id: "9846041345",
    },
    {
      status: { type: "success", text: "Completed" },
      name: "Melody Frami",
      id: "7385256175",
    },
    {
      status: { type: "important", text: "Updated" },
      name: "Frederick Skiles",
      id: "5807570418",
    },
    {
      status: { type: "success", text: "Completed" },
      name: "Dana Pfannerstill",
      id: "5736306857",
    },
  ];

  dataFiltered = this.getFilteredData(this.typedChips);

  handleInputChange(detail: GoabInputOnChangeDetail): void {
    const newValue = detail.value.trim();
    this.inputValue = newValue;
  }

  handleInputKeyPress(detail: GoabInputOnKeyPressDetail): void {
    if (detail.key === "Enter") {
      this.applyFilter();
    }
  }

  applyFilter(): void {
    if (this.inputValue === "") {
      this.inputError = this.errorEmpty;
      return;
    }
    if (this.typedChips.includes(this.inputValue)) {
      this.inputError = this.errorDuplicate;
      return;
    }
    this.typedChips = [...this.typedChips, this.inputValue];
    this.inputValue = "";
    this.inputError = "";
    this.dataFiltered = this.getFilteredData(this.typedChips);
  }

  removeTypedChip(chip: string): void {
    this.typedChips = this.typedChips.filter(c => c !== chip);
    this.dataFiltered = this.getFilteredData(this.typedChips);
    this.inputError = "";
  }

  removeAllTypedChips(): void {
    this.typedChips = [];
    this.dataFiltered = this.getFilteredData(this.typedChips);
    this.inputError = "";
  }

  getFilteredData(typedChips: string[]): DataItem[] {
    if (typedChips.length === 0) {
      return this.data;
    }
    return this.data.filter(item =>
      typedChips.every(chip => this.checkNested(item, chip))
    );
  }

  checkNested(obj: object, chip: string): boolean {
    return Object.values(obj).some(value =>
      typeof value === "object" && value !== null
        ? this.checkNested(value, chip)
        : typeof value === "string" && value.toLowerCase().includes(chip.toLowerCase())
    );
  }
}
