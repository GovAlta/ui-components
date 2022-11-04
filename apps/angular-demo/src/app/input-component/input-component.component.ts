import { Component } from "@angular/core";
import { format, parseISO } from "date-fns";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-input-component",
  templateUrl: "./input-component.component.html",
  styleUrls: ["./input-component.component.css"],
})
export class InputComponentComponent {
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
  sliderVal = 50;
  dateVal = format(this.date, "yyyy-MM-dd");
  arrayVal = undefined;

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
