import { Component } from "@angular/core";
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

@Component({
  selector: "app-show-number-of-results-per-page",
  templateUrl: "./angular.html",
})
export class ShowNumberOfResultsPerPageComponent {
  users: User[] = generateUsers();
  page = 1;
  perPage = 10;

  get pageUsers(): User[] {
    const offset = (this.page - 1) * this.perPage;
    return this.users.slice(offset, offset + this.perPage);
  }

  handlePageChange(event: GoabPaginationOnChangeDetail): void {
    this.page = event.page;
  }

  handlePerPageCountChangeEvent(event: GoabDropdownOnChangeDetail): void {
    this.page = 1;
    this.perPage = Number(event.value);
  }
}

function generateUsers(): User[] {
  const firstNames = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "James",
    "Sophia",
    "William",
    "Isabella",
    "Oliver",
    "Mia",
    "Benjamin",
    "Charlotte",
    "Elijah",
    "Amelia",
    "Lucas",
    "Harper",
    "Mason",
    "Evelyn",
    "Logan",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Wilson",
    "Anderson",
    "Taylor",
    "Thomas",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Thompson",
    "White",
  ];
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
