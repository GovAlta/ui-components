import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabPagination,
  GoabSpacer,
  GoabTable,
  GoabText,
} from "@abgov/angular-components";
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

const FIRST_NAMES = ["Emma", "Liam", "Olivia", "Noah", "Ava", "James", "Sophia", "William", "Isabella", "Oliver"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

@Component({
  standalone: true,
  selector: "abgov-bug3741",
  templateUrl: "./bug3741.component.html",
  imports: [
    GoabBlock,
    GoabDropdown,
    GoabDropdownItem,
    GoabPagination,
    GoabSpacer,
    GoabTable,
    GoabText,
  ],
})
export class Bug3741Component {
  users: User[] = Array.from({ length: 100 }, (_, i) => ({
    id: `user-${i + 1}`,
    firstName: FIRST_NAMES[i % FIRST_NAMES.length],
    lastName: LAST_NAMES[i % LAST_NAMES.length],
    age: 20 + ((i + 1) % 40),
  }));
  page = 1;
  perPage = 10;

  get pageUsers(): User[] {
    const offset = (this.page - 1) * this.perPage;
    return this.users.slice(offset, offset + this.perPage);
  }

  handlePageChange(event: GoabPaginationOnChangeDetail) {
    this.page = event.page;
  }

  handlePerPageCountChangeEvent(event: GoabDropdownOnChangeDetail) {
    this.page = 1;
    this.perPage = parseInt(event.value || "10");
  }
}
