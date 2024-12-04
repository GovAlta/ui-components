import { GoabBlock, GoabContainer } from "@abgov/angular-components";
import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";

type User = {
  firstName: string;
  lastName: string;
  age: number;
};

@Component({
  standalone: true,
  selector: "goa-bug1756",
  templateUrl: "./bug-1756.html",
  imports: [GoabContainer, GoabBlock, NgFor, CommonModule],
})
export class Bug1756 {
  users: User[] | null = null;
  _users: User[] = [
    { firstName: "Jim", lastName: "Smith", age: 23 },
    { firstName: "Larry", lastName: "Lloyd", age: 34 },
    { firstName: "Andy", lastName: "Anderson", age: 32 },
    { firstName: "Sam", lastName: "Black", age: 54 },
  ];

  OnInit() {
    this.users = this._users;
  }
}
