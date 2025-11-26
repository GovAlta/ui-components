import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabFormItem,
  GoabDatePicker,
  GoabBlock,
  GoabText,
} from "@abgov/angular-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat2682",
  templateUrl: "./feat2682.component.html",
  imports: [CommonModule, GoabFormItem, GoabDatePicker, GoabBlock, GoabText],
})
export class Feat2682Component {
  // Calculate min and max dates (one month before and after today)
  today = new Date();
  minDate = new Date(
    this.today.getFullYear(),
    this.today.getMonth() - 1,
    this.today.getDate(),
  );
  maxDate = new Date(
    this.today.getFullYear(),
    this.today.getMonth() + 1,
    this.today.getDate(),
  );

  handleDateChange(detail: GoabDatePickerOnChangeDetail): void {
    console.log("DatePicker onChange event:", detail);
  }
}
