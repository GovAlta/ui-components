import { Component } from '@angular/core';
import { format } from "date-fns";

@Component({
  selector: 'abgov-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent {

  constructor() { }

  valueDate = format(new Date(), "yyyy-MM-dd");
  minDate = format(new Date(), "yyyy-MM-dd");
  maxDate = this.getDateWithMonthOffset(1);

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

  onChange(e: any) {
    this.valueDate = e.detail.value;
  }
}
