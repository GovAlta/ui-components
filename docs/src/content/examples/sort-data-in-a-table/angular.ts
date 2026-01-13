import { Component } from "@angular/core";
import type { GoabTableOnSortDetail } from "@abgov/ui-components-common";

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  selector: "app-sort-data-in-a-table",
  templateUrl: "./angular.html",
})
export class SortDataInATableComponent {
  users: User[] = [
    { firstName: "Christian", lastName: "Batz", age: 18 },
    { firstName: "Brain", lastName: "Wisozk", age: 19 },
    { firstName: "Neha", lastName: "Jones", age: 23 },
    { firstName: "Tristin", lastName: "Buckridge", age: 31 },
  ];

  handleSort(event: GoabTableOnSortDetail): void {
    const { sortBy, sortDir } = event;
    this.users.sort(
      (a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir
    );
  }
}
