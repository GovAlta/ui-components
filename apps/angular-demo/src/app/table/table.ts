import { Component } from "@angular/core";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  selector: "abgov-table-component",
  templateUrl: "./table.html",
})
export class TableComponent {
  users: User[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: Math.random(),
        firstName: getFirstName(),
        lastName: getLastName(),
        age: getAge(),
      });
    }
  }
}

function getFirstName(): string {
  const index = Math.floor(Math.random() * (firstNames.length - 1));
  return firstNames[index];
}

function getLastName(): string {
  const index = Math.floor(Math.random() * (lastNames.length - 1));
  return lastNames[index];
}

function getAge(): number {
  return 18 + Math.floor(Math.random() * 60);
}

const firstNames = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Charles",
  "Josep",
  "Thomas",
  "Christopher",
  "Daniel",
  "Paul",
  "Mark",
  "Donald",
  "Georg",
  "Kenneth",
  "Steve",
  "Edward",
  "Brian",
  "Ronald",
  "Anthon",
  "Kevin",
  "Jason",
  "Matthew",
  "Gary",
  "Timothy",
  "Jose",
  "Larry",
  "Jeffrey",
  "Frank",
  "Scot",
  "Eric",
  "Stephen",
  "Andrew",
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
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Thompson",
  "White",
  "Harris",
];
