import { Component } from "@angular/core";
import {
  GoabAccordion,
  GoabPagination,
  GoabTable,
  GoabText,
} from "@abgov/angular-components";
import type { GoabPaginationOnChangeDetail } from "@abgov/ui-components-common";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];

function generateUsers(): User[] {
  return Array.from({ length: 100 }, (_, index) => ({
    id: `user-${index + 1}`,
    firstName: firstNames[index % firstNames.length],
    lastName: lastNames[index % lastNames.length],
    age: 20 + ((index + 1) % 40),
  }));
}

@Component({
  standalone: true,
  selector: "abgov-bug3103",
  templateUrl: "./bug3103.component.html",
  imports: [GoabAccordion, GoabPagination, GoabTable, GoabText],
})
export class Bug3103Component {
  readonly users = generateUsers();
  readonly perPage = 10;
  page = 1;

  get pageUsers(): User[] {
    const offset = (this.page - 1) * this.perPage;
    return this.users.slice(offset, offset + this.perPage);
  }

  handlePageChange(event: GoabPaginationOnChangeDetail): void {
    this.page = event.page;
  }
}
