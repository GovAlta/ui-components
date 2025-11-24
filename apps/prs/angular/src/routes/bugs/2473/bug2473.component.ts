import { Component } from "@angular/core";
import { GoabDatePicker, GoabBlock } from "@abgov/angular-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabDatePicker, GoabBlock],
  templateUrl: "./bug2473.component.html",
  styleUrls: ["./bug2473.component.css"],
})
export class Bug2473Component {
  // Date picker 1: Default value of 1 month in the past
  datePicker1Value: Date | null = new Date();
  datePicker1Display = "";

  // Date picker 2: Min/max constraints (2 months past to 2 months future)
  datePicker2Value: Date | null = null;
  datePicker2Display = "";
  datePicker2Min: Date = new Date();
  datePicker2Max: Date = new Date();

  // Date picker 3: Input type
  datePicker3Value: Date | null = null;
  datePicker3Display = "";

  constructor() {
    // Set default value for date picker 1 (1 month in the past)
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    this.datePicker1Value = oneMonthAgo;
    this.datePicker1Display = this.formatDate(oneMonthAgo);

    // Set min/max constraints for date picker 2
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    this.datePicker2Min = twoMonthsAgo;

    const twoMonthsFuture = new Date();
    twoMonthsFuture.setMonth(twoMonthsFuture.getMonth() + 2);
    this.datePicker2Max = twoMonthsFuture;
  }

  onDatePicker1Change(event: GoabDatePickerOnChangeDetail) {
    this.datePicker1Value = event.value as Date | null;
    this.datePicker1Display = this.formatDate(event.value as Date | null);
  }

  onDatePicker2Change(event: GoabDatePickerOnChangeDetail) {
    this.datePicker2Value = event.value as Date | null;
    this.datePicker2Display = this.formatDate(event.value as Date | null);
  }

  onDatePicker3Change(event: GoabDatePickerOnChangeDetail) {
    console.log("Date Picker 3 changed: ", event.value);
    this.datePicker3Value = event.value as Date | null;
    this.datePicker3Display = this.formatDate(event.value as Date | null);
  }

  private formatDate(date: Date | null): string {
    if (!date) return "No date selected";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
