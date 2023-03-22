import { Component } from "@angular/core";
import { faker } from "@faker-js/faker";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  selector: "abgov-paginate",
  templateUrl: "./paginate.html",
})
export class PaginateComponent {
  users: User[] = [];
  pageUsers: User[] = [];
  page = 1;
  perPageCount = 5;

  handlePageChange(event: Event) {
    const e = event as CustomEvent;
    this.page = e.detail.page;

    const offset = (this.page - 1) * this.perPageCount;
    this.pageUsers = this.users.slice(offset, offset + this.perPageCount);
  }

  handlePerPageCountChange(event: Event) {
    const e = event as CustomEvent;
    this.perPageCount = e.detail.count;
    this.pageUsers = this.users.slice(0, this.perPageCount);
    console.log("pageusers", this.pageUsers);
  }

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({ min: 18, max: 60 }),
      });
    }

    this.pageUsers = this.users.slice(0, this.perPageCount);
  }
}
