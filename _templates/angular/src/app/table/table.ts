import { GoabBlock, GoabIcon, GoabTable, GoabTableSortHeader } from "@abgov/angular-components";
import { GoabTableOnSortDetail } from "@abgov/ui-components-common";
import { NgForOf } from "@angular/common";
import { Component } from "@angular/core";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  standalone: true,
  selector: "abgov-table-component",
  templateUrl: "./table.html",
  imports: [
    GoabBlock,
    GoabTable,
    GoabTableSortHeader,
    GoabIcon,
    NgForOf,
  ],
})
export class TableComponent {
  users: User[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 60 }),
      });
    }
  }

  handleSort(event: GoabTableOnSortDetail) {
    const { sortBy, sortDir } = event;
    this.users.sort(
      (a: any, b: any) => (a[sortBy] > b[sortBy] ? -1 : 1) * sortDir
    );
  }
}
