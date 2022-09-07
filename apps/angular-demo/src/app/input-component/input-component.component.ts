import { Component } from '@angular/core';
import { format } from "date-fns";

@Component({
  selector: 'abgov-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent {
  constructor() { }

  date = new Date();
  formatDate = format(this.date, "yyyy-MM-dd");
  time = format(this.date, "HH:mm:ss");
  dateTime = format(this.date, "yyyy-MM-dd HH:mm")
  minDate = format(this.date, "yyyy-MM-dd");
  maxDate = format(this.getDateWithMonthOffset(1), "yyyy-MM-dd");

  getDateWithMonthOffset(offset: number) {
    const d = new Date();
    d.setMonth(d.getMonth() + offset);
    return d;
  }

  onInputChangeEvent(event: any) {
    console.log('onEvent', event.detail);
  }

  handleTrailingIconClick() {
    console.log('handleTrailingIconClick');
  }
}
