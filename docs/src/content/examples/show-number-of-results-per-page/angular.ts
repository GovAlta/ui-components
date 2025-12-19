import { Component } from "@angular/core";
import {
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
  users: User[] = [];
  pageUsers: User[] = [];
  page = 1;
  perPage = 10;
  total = 100;

  constructor() {
    this.pageUsers = this.prepareUsers().slice(0, this.perPage);
  }

  prepareUsers(): User[] {
    const firstNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "James", "Sophia", "William", "Isabella", "Oliver", "Mia", "Benjamin", "Charlotte", "Elijah", "Amelia", "Lucas", "Harper", "Mason", "Evelyn", "Logan"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White"];
    for (let i = 1; i <= this.total; i++) {
      this.users.push({
        id: `user-${i}`,
        firstName: firstNames[(i - 1) % firstNames.length],
        lastName: lastNames[(i - 1) % lastNames.length],
        age: 20 + (i % 40),
      });
    }
    return this.users;
  }

  handlePageChange(event: GoabPaginationOnChangeDetail): void {
    this.page = event.page;
    const offset = (this.page - 1) * this.perPage;
    this.pageUsers = this.users.slice(offset, offset + this.perPage);
  }

  handlePerPageCountChangeEvent(event: GoabDropdownOnChangeDetail): void {
    this.page = 1;
    this.perPage = Number(event.value);
    this.pageUsers = this.users.slice(0, this.perPage);
  }
}
