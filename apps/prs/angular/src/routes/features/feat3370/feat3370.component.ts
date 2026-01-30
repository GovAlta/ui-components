import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabButton,
  GoabButtonGroup,
  GoabCalendar,
  GoabDatePicker,
} from "@abgov/angular-components";
import {
  GoabCalendarOnChangeDetail,
  GoabDatePickerOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat3370",
  templateUrl: "./feat3370.component.html",
  imports: [CommonModule, GoabButton, GoabButtonGroup, GoabCalendar, GoabDatePicker],
})
export class Feat3370Component {
  calendarValue: Date | string = "";
  datePickerValue = "";

  handleOnChange(details: GoabCalendarOnChangeDetail): void {
    this.calendarValue = details.value;
  }

  handleDatePickerChange(details: GoabDatePickerOnChangeDetail): void {
    this.datePickerValue = details.valueStr;
  }

  clearCalendarValue(): void {
    this.calendarValue = "";
  }

  clearDatePickerValue(): void {
    this.datePickerValue = "";
  }

  toCalendarDateValue(): void {
    if (this.datePickerValue) {
      this.calendarValue = new Date(`${this.datePickerValue}T00:00:00`);
    }
  }

  toCalendarStringValue(): void {
    if (this.datePickerValue) {
      this.calendarValue = this.datePickerValue;
    }
  }
}
