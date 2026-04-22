import { Component } from "@angular/core";
import {
  GoabBadge, GoabBlock, GoabButton, GoabButtonGroup, GoabCallout, GoabContainer,
  GoabDropdown, GoabDropdownItem, GoabFilterChip, GoabFormItem, GoabIconButton,
  GoabInput, GoabLink, GoabPagination, GoabSpacer, GoabTab, GoabTable,
  GoabTableSortHeader, GoabTabs, GoabText,
} from "@abgov/angular-components";
import type {
  GoabBadgeType, GoabDropdownOnChangeDetail, GoabInputOnChangeDetail,
  GoabInputOnKeyPressDetail, GoabPaginationOnChangeDetail,
  GoabTableOnSortDetail, GoabTableOnMultiSortDetail,
} from "@abgov/ui-components-common";

interface SortRow { name: string; status: string; date: string; }
interface FilterItem { status: { type: GoabBadgeType; text: string }; name: string; id: string; }
interface SortExampleUser { firstName: string; lastName: string; age: number; }
interface PaginationUser { id: string; firstName: string; lastName: string; age: number; }

@Component({
  standalone: true,
  selector: "abgov-docs-table",
  templateUrl: "./table.component.html",
  imports: [
    GoabBadge, GoabBlock, GoabButton, GoabButtonGroup, GoabCallout, GoabContainer,
    GoabDropdown, GoabDropdownItem, GoabFilterChip, GoabFormItem, GoabIconButton,
    GoabInput, GoabLink, GoabPagination, GoabSpacer, GoabTab, GoabTable,
    GoabTableSortHeader, GoabTabs, GoabText,
  ],
})
export class DocsTableComponent {
  // Single sort
  sortData: SortRow[] = [
    { name: "Alice Johnson", status: "Active", date: "2024-01-15" },
    { name: "Charlie Brown", status: "Pending", date: "2024-03-20" },
    { name: "Bob Smith", status: "Active", date: "2024-02-10" },
    { name: "Emma Wilson", status: "Inactive", date: "2023-12-01" },
    { name: "David Lee", status: "Pending", date: "2024-01-30" },
  ];

  handleSort(event: GoabTableOnSortDetail): void {
    this.sortData = [...this.sortData].sort((a: any, b: any) => {
      return a[event.sortBy].localeCompare(b[event.sortBy]) * event.sortDir;
    });
  }

  // Multi sort
  multiSortData: SortRow[] = [
    { name: "Alice Johnson", status: "Active", date: "2024-01-15" },
    { name: "Charlie Brown", status: "Pending", date: "2024-03-20" },
    { name: "Bob Smith", status: "Active", date: "2024-02-10" },
    { name: "Emma Wilson", status: "Inactive", date: "2023-12-01" },
    { name: "David Lee", status: "Pending", date: "2024-01-30" },
  ];

  handleMultiSort(event: GoabTableOnMultiSortDetail): void {
    this.multiSortData = [...this.multiSortData].sort((a: any, b: any) => {
      for (const sort of event.sorts) {
        const dir = sort.direction === "asc" ? 1 : -1;
        const cmp = a[sort.column].localeCompare(b[sort.column]);
        if (cmp !== 0) return cmp * dir;
      }
      return 0;
    });
  }

  // Filter data in a table
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

  // Tabs
  review = [0, 1, 2, 3];
  complete = [0, 1];

  // Pagination
  users: PaginationUser[] = [];
  pageUsers: PaginationUser[] = [];
  page = 1;
  perPage = 10;

  constructor() {
    const firstNames = ["Emma","Liam","Olivia","Noah","Ava","James","Sophia","William","Isabella","Oliver","Mia","Benjamin","Charlotte","Elijah","Amelia","Lucas","Harper","Mason","Evelyn","Logan"];
    const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Wilson","Anderson","Taylor","Thomas","Moore","Jackson","Martin","Lee","Thompson","White"];
    for (let i = 1; i <= 100; i++) {
      this.users.push({
        id: `user-${i}`,
        firstName: firstNames[(i - 1) % firstNames.length],
        lastName: lastNames[(i - 1) % lastNames.length],
        age: 20 + (i % 40),
      });
    }
    this.pageUsers = this.users.slice(0, this.perPage);
  }

  handlePageChange(event: GoabPaginationOnChangeDetail): void {
    this.page = event.page;
    const offset = (this.page - 1) * this.perPage;
    this.pageUsers = this.users.slice(offset, offset + this.perPage);
  }

  handlePerPageChange(event: GoabDropdownOnChangeDetail): void {
    this.page = 1;
    this.perPage = Number(event.value);
    this.pageUsers = this.users.slice(0, this.perPage);
  }

  // Multiple actions
  actionRows: { status: GoabBadgeType; statusText: string; name: string; id: number }[] = [
    { status: "information", statusText: "In progress", name: "Darlene Robertson", id: 45904 },
    { status: "default", statusText: "Inactive", name: "Floyd Miles", id: 47838 },
    { status: "success", statusText: "Active", name: "Kathryn Murphy", id: 34343 },
    { status: "important", statusText: "Recent", name: "Annette Black", id: 89897 },
    { status: "success", statusText: "Active", name: "Esther Howard", id: 12323 },
    { status: "success", statusText: "Active", name: "Jane Cooper", id: 56565 },
  ];

  // Status badges
  badgeValues = [
    { type: "important" as GoabBadgeType, content: "Pending" },
    { type: "emergency" as GoabBadgeType, content: "Failed" },
    { type: "success" as GoabBadgeType, content: "Complete" },
    { type: "information" as GoabBadgeType, content: "In progress" },
    { type: "default" as GoabBadgeType, content: "Closed" },
    { type: "success" as GoabBadgeType, content: "Complete" },
  ];

  // Sort example
  sortExampleUsers: SortExampleUser[] = [
    { firstName: "Christian", lastName: "Batz", age: 18 },
    { firstName: "Brain", lastName: "Wisozk", age: 19 },
    { firstName: "Neha", lastName: "Jones", age: 23 },
    { firstName: "Tristin", lastName: "Buckridge", age: 31 },
  ];

  handleSortExample(event: GoabTableOnSortDetail): void {
    this.sortExampleUsers = [...this.sortExampleUsers].sort((a: any, b: any) => {
      return (a[event.sortBy] > b[event.sortBy] ? 1 : -1) * event.sortDir;
    });
  }

  onAddToCalendar(): void { console.log("Add to calendar clicked"); }
  onAssignClick(): void { console.log("Assign clicked"); }
}
