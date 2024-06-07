import { Component } from "@angular/core";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  selector: "goab-table-component",
  templateUrl: "./table.html",
})
export class TableComponent {
  users: User[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({ min: 18, max: 60 }),
      });
    }
  }

  handleSort(event: any) {
    const { sortBy, sortDir } = event.detail;
    this.users.sort(
      (a: any, b: any) => (a[sortBy] > b[sortBy] ? -1 : 1) * sortDir
    );
  }
}
