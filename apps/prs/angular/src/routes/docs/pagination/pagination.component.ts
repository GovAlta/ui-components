import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabPagination,
  GoabSpacer,
  GoabTable,
} from "@abgov/angular-components";
import type {
  GoabDropdownOnChangeDetail,
  GoabPaginationOnChangeDetail,
} from "@abgov/ui-components-common";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

function generateUsers(): User[] {
  const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "James", "Sophia", "William", "Isabella", "Oliver", "Mia", "Benjamin", "Charlotte", "Elijah", "Amelia", "Lucas", "Harper", "Mason", "Evelyn", "Logan"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White"];
  const users: User[] = [];
  for (let i = 1; i <= 100; i++) {
    users.push({
      id: `user-${i}`,
      firstName: firstNames[(i - 1) % firstNames.length],
      lastName: lastNames[(i - 1) % lastNames.length],
      age: 20 + (i % 40),
    });
  }
  return users;
}

@Component({
  standalone: true,
  selector: "abgov-docs-pagination",
  templateUrl: "./pagination.component.html",
  imports: [
    GoabBlock,
    GoabDropdown,
    GoabDropdownItem,
    GoabPagination,
    GoabSpacer,
    GoabTable,
  ],
})
export class DocsPaginationComponent {
  basicPage = 1;
  simplePage = 1;

  // Examples - Show number of results per page
  users: User[] = generateUsers();
  page = 1;
  perPage = 10;

  get pageUsers(): User[] {
    const offset = (this.page - 1) * this.perPage;
    return this.users.slice(offset, offset + this.perPage);
  }

  handleBasicPageChange(event: GoabPaginationOnChangeDetail): void {
    this.basicPage = event.page;
  }

  handleSimplePageChange(event: GoabPaginationOnChangeDetail): void {
    this.simplePage = event.page;
  }

  handlePageChange(event: GoabPaginationOnChangeDetail): void {
    this.page = event.page;
  }

  handlePerPageCountChangeEvent(event: GoabDropdownOnChangeDetail): void {
    this.page = 1;
    this.perPage = Number(event.value);
  }
}
