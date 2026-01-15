import { Component } from "@angular/core";
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabxCheckbox,
  GoabxCheckboxList,
  GoabText,
  GoabTable,
  GoabBlock,
  GoabDivider,
  GoabCheckboxOnChangeDetail,
  GoabCheckboxListOnChangeDetail,
} from "@abgov/angular-components";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "abgov-feat-v2-checkbox",
  templateUrl: "./featV2Checkbox.component.html",
  imports: [
    CommonModule,
    GoabCheckbox,
    GoabCheckboxList,
    GoabxCheckbox,
    GoabxCheckboxList,
    GoabText,
    GoabTable,
    GoabBlock,
    GoabDivider,
  ],
})
export class FeatV2CheckboxComponent {
  selectedRows: Set<string> = new Set();
  checkboxListValue: string[] = [];
  compactListValue: string[] = [];
  v1ListValue: string[] = [];

  tableData = [
    { id: "row1", name: "Alice Johnson", email: "alice@example.com", status: "Active" },
    { id: "row2", name: "Bob Smith", email: "bob@example.com", status: "Pending" },
    { id: "row3", name: "Carol Davis", email: "carol@example.com", status: "Active" },
  ];

  get allSelected(): boolean {
    return this.selectedRows.size === this.tableData.length;
  }

  get someSelected(): boolean {
    return this.selectedRows.size > 0 && this.selectedRows.size < this.tableData.length;
  }

  isRowSelected(rowId: string): boolean {
    return this.selectedRows.has(rowId);
  }

  toggleSelectAll(event: GoabCheckboxOnChangeDetail) {
    if (event.checked) {
      this.selectedRows = new Set(this.tableData.map(row => row.id));
    } else {
      this.selectedRows = new Set();
    }
  }

  toggleRow(rowId: string, event: GoabCheckboxOnChangeDetail) {
    const newSelected = new Set(this.selectedRows);
    if (event.checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    this.selectedRows = newSelected;
  }

  onCheckboxListChange(event: GoabCheckboxListOnChangeDetail) {
    this.checkboxListValue = event.value;
  }

  onCompactListChange(event: GoabCheckboxListOnChangeDetail) {
    this.compactListValue = event.value;
  }

  onV1ListChange(event: GoabCheckboxListOnChangeDetail) {
    this.v1ListValue = event.value;
  }
}
