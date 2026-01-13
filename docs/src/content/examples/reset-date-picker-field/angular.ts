import { Component } from "@angular/core";

@Component({
  selector: "app-reset-date-picker-field",
  templateUrl: "./angular.html",
})
export class ResetDatePickerFieldComponent {
  item: Date | undefined = undefined;

  onChange(event: { value: Date | undefined }): void {
    this.item = event.value;
  }

  setValue(): void {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    this.item = d;
  }

  clearValue(): void {
    this.item = undefined;
  }
}
