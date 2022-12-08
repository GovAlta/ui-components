import { Component, OnInit } from "@angular/core";
import { format, parseISO } from "date-fns";
import { FormControl } from "@angular/forms";

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  selector: "abgov-input-component",
  templateUrl: "./input-component.component.html",
  styleUrls: ["./input-component.component.css"],
})
export class InputComponentComponent implements OnInit {
  date = new Date();
  boundDate = format(this.date, "yyyy-MM-dd");
  formatDate = format(this.date, "yyyy-MM-dd");
  time = format(this.date, "HH:mm:ss");
  dateTime = format(this.date, "yyyy-MM-dd HH:mm");
  minDate = format(this.date, "yyyy-MM-dd");
  maxDate = format(this.getDateWithMonthOffset(1), "yyyy-MM-dd");

  wcVal = "event bound";
  tempDrivenVal = "template bound";
  reactiveFormCtrl = new FormControl("reactive form");
  reactiveDateFormCtrl = new FormControl(format(this.date, "yyyy-MM-dd"));
  reactiveTimeFormCtrl = new FormControl(this.time);
  sliderVal = 50;
  dateVal = format(this.date, "yyyy-MM-dd");
  arrayVal = undefined;

  users: User[] = [];

  getUser() {
    console.log("getting user");
    return {
      firstName: getFirstName(),
      lastName: getLastName(),
      age: getAge(),
    };
  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.users.push(this.getUser());
    }
  }

  updateInput(event: any) {
    this.wcVal = event.detail.value;
  }

  getDateWithMonthOffset(offset: number) {
    const d = new Date();
    d.setMonth(d.getMonth() + offset);
    return d;
  }

  onInputChangeEvent(event: any) {
    console.log("onEvent", event.detail);
  }

  setDate(event: any) {
    const raw = event.detail.value;
    if (!raw) {
      return;
    }
    const d = parseISO(raw);
    this.boundDate = format(d, "yyyy-MM-dd");
  }

  handleTrailingIconClick() {
    console.log("handleTrailingIconClick");
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
