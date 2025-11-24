import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabTable,
  GoabTableSortHeader,
  GoabBlock,
  GoabText,
  GoabButton,
} from "@abgov/angular-components";
import { GoabTableOnSortDetail } from "@abgov/ui-components-common";

interface TableRow {
  id: number;
  name: string;
  age: number;
  department: string;
}

@Component({
  standalone: true,
  selector: "abgov-bug2821",
  templateUrl: "./bug2821.component.html",
  imports: [
    CommonModule,
    GoabTable,
    GoabTableSortHeader,
    GoabBlock,
    GoabText,
    GoabButton,
  ],
})
export class Bug2821Component {
  sortLog: string[] = [];
  clickCount = 0;

  // Original data for resetting
  originalData: TableRow[] = [
    { id: 1, name: "Alice Johnson", age: 28, department: "Engineering" },
    { id: 2, name: "Bob Smith", age: 32, department: "Marketing" },
    { id: 3, name: "Carol Davis", age: 25, department: "Sales" },
    { id: 4, name: "David Wilson", age: 35, department: "Engineering" },
    { id: 5, name: "Eva Brown", age: 29, department: "HR" },
  ];

  // Display data that gets sorted
  sampleData: TableRow[] = [...this.originalData];

  handleSort(detail: GoabTableOnSortDetail) {
    this.clickCount++;

    const sortDirection = detail.sortDir === 1 ? "ascending" : "descending";
    const logEntry = `Click ${this.clickCount}: Sort by "${detail.sortBy}" - ${sortDirection}`;

    this.sortLog.push(logEntry);
    console.log("Sort event:", detail);

    // Sort the data based on the sort event
    this.sampleData = [...this.originalData].sort((a, b) => {
      let aValue: any = a[detail.sortBy as keyof TableRow];
      let bValue: any = b[detail.sortBy as keyof TableRow];

      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // Handle number comparison
      if (typeof aValue === "number" && typeof bValue === "number") {
        return detail.sortDir === 1 ? aValue - bValue : bValue - aValue;
      }

      // Handle string comparison
      if (aValue < bValue) {
        return detail.sortDir === 1 ? -1 : 1;
      }
      if (aValue > bValue) {
        return detail.sortDir === 1 ? 1 : -1;
      }
      return 0;
    });
  }

  resetTest() {
    this.sortLog = [];
    this.clickCount = 0;
    this.sampleData = [...this.originalData];
  }

  trackByIndex(index: number): number {
    return index;
  }
}
