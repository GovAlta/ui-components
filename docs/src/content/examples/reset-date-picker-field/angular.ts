import { Component } from "@angular/core";
import type { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-reset-date-picker-field",
  templateUrl: "./angular.html",
})
export class ResetDatePickerFieldComponent {
  item: Date | undefined = undefined;

  onChange(event: GoabDatePickerOnChangeDetail): void {
    this.item = event.valueStr ? new Date(event.valueStr) : undefined;
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
