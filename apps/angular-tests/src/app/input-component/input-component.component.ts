import { Component, OnInit } from "@angular/core";
import { format, parseISO } from "date-fns";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabBadge,
  GoabDatePicker,
  GoabFormItem,
  GoabFormItemSlot,
  GoabInput,
} from "@abgov/angular-components";
import { JsonPipe, NgTemplateOutlet } from "@angular/common";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  standalone: true,
  selector: "abgov-input-component",
  templateUrl: "./input-component.component.html",
  imports: [
    GoabInput,
    GoabDatePicker,
    GoabBadge,
    GoabFormItem,
    JsonPipe,
    ReactiveFormsModule,
    FormsModule,
    GoabFormItemSlot,
    NgTemplateOutlet
  ],
})
export class InputComponentComponent implements OnInit {
  example1 = "";
  example3 = "Test";
  example2Form: FormGroup;
  handleExample1(event: GoabInputOnChangeDetail) {
    this.example1 = event.value;
  }

  constructor() {
    this.example2Form = new FormGroup({
      inputControl: new FormControl("")
    })
  }


  date = new Date();
  boundDate = format(this.date, "yyyy-MM-dd");
  formatDate = format(this.date, "yyyy-MM-dd");
  time = format(this.date, "HH:mm:ss");
  dateTime = format(this.date, "yyyy-MM-dd HH:mm");
  minDate = format(this.date, "yyyy-MM-dd");
  maxDate = format(this.getDateWithMonthOffset(1), "yyyy-MM-dd");

  reactiveDate2FormCtrl = new FormControl(new Date());

  wcVal = "event bound";
  tempDrivenVal = "template bound";
  reactiveFormCtrl = new FormControl("reactive form");
  reactiveDateFormCtrl = new FormControl(format(this.date, "yyyy-MM-dd"));
  reactiveTimeFormCtrl = new FormControl(this.time);
  sliderVal = 50;
  dateVal = format(this.date, "yyyy-MM-dd");
  arrayVal = undefined;

  users: User[] = [];

  form = new FormGroup({
    first: new FormControl("reactive form")
  })

  onSubmit(e: any) {
    console.log("onSubmit", this.form);
  }

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
    this.wcVal = event.value;
  }

  getDateWithMonthOffset(offset: number) {
    const d = new Date();
    d.setMonth(d.getMonth() + offset);
    return d;
  }

  onInputChangeEvent(event: any) {
    console.log("onEvent", event.detail);
  }

  onFocusEvent(event: any) {
    console.log("on Focus Event: ", event.detail);
  }

  onBlurEvent(event: any) {
    console.log("on Blur Event: ", event.detail);
  }

  onKeyPressEvent(event: any) {
    console.log("on Key Press Event: ", event.detail);
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
