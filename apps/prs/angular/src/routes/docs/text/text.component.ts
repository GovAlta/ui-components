import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  GoabBadge, GoabBlock, GoabButton, GoabButtonGroup, GoabContainer, GoabDetails,
  GoabDivider, GoabDropdown, GoabDropdownItem, GoabFilterChip, GoabFormItem,
  GoabGrid, GoabInput, GoabLink, GoabTable, GoabText,
} from "@abgov/angular-components";
import type {
  GoabBadgeType, GoabInputOnChangeDetail, GoabInputOnKeyPressDetail,
} from "@abgov/ui-components-common";

interface FilterItem { status: { type: GoabBadgeType; text: string }; name: string; id: string; }

@Component({
  standalone: true,
  selector: "abgov-docs-text",
  templateUrl: "./text.component.html",
  imports: [
    GoabBadge, GoabBlock, GoabButton, GoabButtonGroup, GoabContainer, GoabDetails,
    GoabDivider, GoabDropdown, GoabDropdownItem, GoabFilterChip, GoabFormItem,
    GoabGrid, GoabInput, GoabLink, GoabTable, GoabText, ReactiveFormsModule,
  ],
})
export class DocsTextComponent {
  // Address form (matches docs snippet pattern)
  addressForm = new FormGroup({
    address: new FormControl(""),
    suite: new FormControl(""),
    city: new FormControl(""),
    province: new FormControl(""),
    postalCode: new FormControl(""),
  });

  // Direct deposit form (matches docs snippet pattern)
  depositForm = new FormGroup({
    bankNumber: new FormControl(""),
    transitNumber: new FormControl(""),
    accountNumber: new FormControl(""),
  });

  onClick(): void {
    // Handle form submission
  }

  onSubmit(): void {
    console.log("Submitted:", this.depositForm.value);
  }

  onAddToCalendar(): void {
    console.log("Add to calendar clicked");
  }

  // Filter data in a table (matches docs snippet pattern)
  typedChips: string[] = [];
  inputValue = "";
  inputError = "";

  filterTableData: FilterItem[] = [
    { status: { type: "information", text: "In progress" }, name: "Ivan Schmidt", id: "7838576954" },
    { status: { type: "success", text: "Completed" }, name: "Luz Lakin", id: "8576953364" },
    { status: { type: "information", text: "In progress" }, name: "Keith McGlynn", id: "9846041345" },
    { status: { type: "success", text: "Completed" }, name: "Melody Frami", id: "7385256175" },
    { status: { type: "important", text: "Updated" }, name: "Frederick Skiles", id: "5807570418" },
    { status: { type: "success", text: "Completed" }, name: "Dana Pfannerstill", id: "5736306857" },
  ];

  dataFiltered = [...this.filterTableData];

  handleInputChange(detail: GoabInputOnChangeDetail): void {
    this.inputValue = detail.value.trim();
  }

  handleInputKeyPress(detail: GoabInputOnKeyPressDetail): void {
    if (detail.key === "Enter") this.applyFilter();
  }

  applyFilter(): void {
    if (this.inputValue === "") { this.inputError = "Empty filter"; return; }
    if (this.typedChips.includes(this.inputValue)) { this.inputError = "Enter a unique filter"; return; }
    this.typedChips = [...this.typedChips, this.inputValue];
    this.inputValue = "";
    this.inputError = "";
    this.dataFiltered = this.getFilteredData();
  }

  removeTypedChip(chip: string): void {
    this.typedChips = this.typedChips.filter(c => c !== chip);
    this.inputError = "";
    this.dataFiltered = this.getFilteredData();
  }

  removeAllTypedChips(): void {
    this.typedChips = [];
    this.inputError = "";
    this.dataFiltered = this.getFilteredData();
  }

  private getFilteredData(): FilterItem[] {
    if (this.typedChips.length === 0) return this.filterTableData;
    return this.filterTableData.filter(item =>
      this.typedChips.every(chip => this.checkNested(item, chip)),
    );
  }

  private checkNested(obj: object, chip: string): boolean {
    return Object.values(obj).some(value =>
      typeof value === "object" && value !== null
        ? this.checkNested(value, chip)
        : typeof value === "string" && value.toLowerCase().includes(chip.toLowerCase()),
    );
  }
}
