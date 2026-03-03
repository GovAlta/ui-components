import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { GoabCalendar, GoabDatePicker, GoabFormItem } from "@abgov/angular-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3497",
  templateUrl: "./bug3497.component.html",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoabCalendar,
    GoabDatePicker,
    GoabFormItem,
  ],
})
export class Bug3497Component implements OnInit {
  today = new Date();
  todayString = "Tue Mar 10 2026 14:31:31 GMT-0600 (Mountain Daylight Time)";
  notToday = new Date(2025, 0, 15); // Jan 15, 2025
  notTodayMax = new Date(2027, 11, 31); // Dec 31, 2027

  // For template-driven form
  item: Date | string = new Date();

  // For reactive form
  form = new FormGroup({
    item: new FormControl<Date | string>(new Date()),
  });

  ngOnInit() {
    console.log("today (Date object)", this.today);
    console.log("today (string)", this.todayString);
  }

  dateOnChange(event: GoabDatePickerOnChangeDetail) {
    console.log("dateOnChange", event);
  }
}
