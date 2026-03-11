import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  GoabBlock,
  GoabDivider,
  GoabDetails,
  GoabxTable,
  GoabxTableSortHeader,
} from "@abgov/angular-components";
import { GoabTableOnSortDetail, GoabTableOnMultiSortDetail, GoabTableSortEntry } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat3344",
  templateUrl: "./feat3344.component.html",
  imports: [
    GoabBlock,
    GoabDivider,
    GoabDetails,
    GoabxTable,
    GoabxTableSortHeader,
  ],
})
export class Feat3344Component implements OnInit, OnDestroy {
  private v2TokensLink: HTMLLinkElement | null = null;

  currentSorts: GoabTableSortEntry[] = [];
  multiSorts: GoabTableSortEntry[] = [];
  test3Sorts: GoabTableSortEntry[] = [];

  data = [
    { id: 1, name: "Alice Johnson", department: "Engineering", salary: 95000 },
    { id: 2, name: "Bob Smith", department: "Marketing", salary: 72000 },
    { id: 3, name: "Carol Williams", department: "Engineering", salary: 105000 },
    { id: 4, name: "David Brown", department: "Sales", salary: 68000 },
    { id: 5, name: "Eve Davis", department: "Marketing", salary: 78000 },
  ];

  singleSorted = [...this.data];
  multiSorted = [...this.data];
  test3Sorted = [...this.data];

  ngOnInit() {
    this.v2TokensLink = document.createElement("link");
    this.v2TokensLink.rel = "stylesheet";
    this.v2TokensLink.href = "/v2-tokens/tokens.css";
    document.head.appendChild(this.v2TokensLink);
  }

  ngOnDestroy() {
    if (this.v2TokensLink) {
      document.head.removeChild(this.v2TokensLink);
      this.v2TokensLink = null;
    }
  }

  onSingleSortChange(detail: GoabTableOnSortDetail) {
    this.currentSorts = [{ column: detail.sortBy, direction: detail.sortDir === 1 ? "asc" : "desc" }];
    this.singleSorted = this.sortData(this.data, this.currentSorts);
  }

  onMultiSortChange(detail: GoabTableOnMultiSortDetail) {
    this.multiSorts = detail.sorts;
    this.multiSorted = this.sortData(this.data, this.multiSorts);
  }

  onTest3SortChange(detail: GoabTableOnMultiSortDetail) {
    this.test3Sorts = detail.sorts;
    this.test3Sorted = this.sortData(this.data, this.test3Sorts);
  }

  formatSorts(sorts: GoabTableSortEntry[]): string {
    if (sorts.length === 0) return "None";
    return sorts.map((s, i) => `${i + 1}. ${s.column} (${s.direction})`).join(", ");
  }

  formatCurrency(value: number): string {
    return "$" + value.toLocaleString();
  }

  private sortData(
    data: typeof this.data,
    sorts: GoabTableSortEntry[],
  ): typeof this.data {
    if (sorts.length === 0) return [...data];
    return [...data].sort((a, b) => {
      for (const { column, direction } of sorts) {
        const aVal = a[column as keyof typeof a];
        const bVal = b[column as keyof typeof b];
        let cmp = 0;
        if (typeof aVal === "string" && typeof bVal === "string") {
          cmp = aVal.localeCompare(bVal);
        } else {
          cmp = (aVal as number) - (bVal as number);
        }
        if (cmp !== 0) return direction === "asc" ? cmp : -cmp;
      }
      return 0;
    });
  }
}
