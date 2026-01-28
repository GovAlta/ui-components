import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabDatePicker,
  GoabDatePickerOnChangeDetail,
  GoabFormItem,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3305",
  templateUrl: "./bug3305.component.html",
  imports: [CommonModule, GoabDatePicker, GoabFormItem, GoabText],
})
export class Bug3305Component {
  calendarValue: Date | string | null | undefined = undefined;
  inputValue: Date | string | null | undefined = undefined;

  handleCalendarChange(event: GoabDatePickerOnChangeDetail) {
    console.log("Calendar changed:", event);
    this.calendarValue = event.valueStr;
  }

  handleInputChange(event: GoabDatePickerOnChangeDetail) {
    console.log("Input changed:", event);
    this.inputValue = event.valueStr;
  }
}
