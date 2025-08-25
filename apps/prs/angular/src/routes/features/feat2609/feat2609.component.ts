import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabBadge,
  GoabBadgeType,
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabCheckboxOnChangeDetail,
  GoabContainer,
  GoabDataGrid,
  GoabDropdown,
  GoabDropdownItem,
  GoabLink,
  GoabTable,
  GoabTableOnSortDetail,
  GoabTableSortHeader,
} from "@abgov/angular-components";

type User = {
  idNumber: string;
  nameOfChild: string;
  dataStarted: string;
  dateSubmitted: string;
  status: string;
  updated: string;
  email: string;
  program: string;
  programId: string;
  serviceAccess: string;
  approver: string;
};

@Component({
  standalone: true,
  selector: "abgov-feat2609",
  templateUrl: "./feat2609.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    GoabBadge,
    GoabTable,
    GoabCheckbox,
    GoabTableSortHeader,
    GoabButton,
    GoabContainer,
    GoabBlock,
    GoabDropdown,
    GoabDropdownItem,
    GoabDataGrid,
    GoabLink,
  ],
})
export class Feat2609Component {
  users: User[] = [
    {
      idNumber: "1",
      nameOfChild: "Mike Zwei",
      dataStarted: "Feb 21, 2023",
      dateSubmitted: "Feb 25, 2023",
      status: "Removed",
      updated: "Jun 30, 2022 at 2:30 PM",
      email: "mike.zwei@gmail.com",
      program: "Wee Wild Ones Curry",
      programId: "74528567",
      serviceAccess: "Claims Adjustments",
      approver: "Sarah Ellis",
    },
    {
      idNumber: "2",
      nameOfChild: "Emma Stroman",
      dataStarted: "Feb 21, 2023",
      dateSubmitted: "Feb 25, 2023",
      status: "To be removed",
      updated: "Nov 28, 2021 at 1:30 PM",
      email: "emma.stroman@gmail.com",
      program: "Fort McMurray",
      programId: "74522643",
      serviceAccess: "Claims Adjustments",
      approver: "Sarah Ellis",
    },
  ];
  _selectedUsers: string[] = [];
  isSelectedAll = false;
  private nextUserId = 3;

  deleteSelected() {
    this.users = this.users.filter((u) => !this._selectedUsers.includes(u.idNumber));
    this._selectedUsers = [];
  }

  getStatusBadgeType(status: string): GoabBadgeType {
    switch (status) {
      case "Removed":
        return "success";
      case "To be removed":
        return "emergency";
      case "Submitted":
        return "information";
      case "In review":
        return "information";
      case "Awaiting documentation":
        return "important";
      case "Denied":
        return "emergency";
      case "Approved":
        return "success";
      case "Closed":
        return "information";
      default:
        return "information";
    }
  }

  selectAll(event: GoabCheckboxOnChangeDetail) {
    this.isSelectedAll = event.checked;
    if (event.checked) {
      this._selectedUsers = this.users.map((u) => u.idNumber);
    } else {
      this._selectedUsers = [];
    }
  }

  isSelected(userId: string): boolean {
    return this._selectedUsers.includes(userId);
  }

  toggleSelection(userId: string, event: GoabCheckboxOnChangeDetail) {
    if (event.checked) {
      this._selectedUsers.push(userId);
    } else {
      this._selectedUsers = this._selectedUsers.filter((id) => id !== userId);
    }
    this.isSelectedAll = this._selectedUsers.length === this.users.length;
  }

  handleSort(event: GoabTableOnSortDetail) {
    const { sortBy, sortDir } = event;
    this.users.sort((a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir);
  }

  onDelete(userId: string) {
    alert("Are you sure you want to delete this user " + userId);
  }

  onOpen(userId: string) {
    alert("We are going to open a profile of this user " + userId);
  }

  onApproverChange(userId: string, event: any) {
    const user = this.users.find((u) => u.idNumber === userId);
    if (user) {
      user.approver = event.value;
    }
  }

  addNewRows() {
    const newUsers: User[] = [];
    for (let i = 0; i < 3; i++) {
      newUsers.push({
        idNumber: String(this.nextUserId),
        nameOfChild: `New User ${this.nextUserId}`,
        dataStarted: "Dec 1, 2023",
        dateSubmitted: "Dec 5, 2023",
        status: "Submitted",
        updated: "Dec 5, 2023 at 10:00 AM",
        email: `user${this.nextUserId}@example.com`,
        program: "Test Program",
        programId: `9999${this.nextUserId}`,
        serviceAccess: "Full Access",
        approver: "Sarah Ellis",
      });
      this.nextUserId++;
    }
    this.users = [...this.users, ...newUsers];
  }

  removeLastRows() {
    if (this.users.length > 2) {
      this.users = this.users.slice(0, -3);
    }
  }
}
