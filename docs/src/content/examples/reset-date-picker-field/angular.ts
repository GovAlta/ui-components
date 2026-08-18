import { Component } from "@angular/core";
import type { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-reset-date-picker-field",
  templateUrl: "./angular.html",
})
export class ResetDatePickerFieldComponent {
  item: string | undefined;

  onChange(event: GoabDatePickerOnChangeDetail): void {
    this.item = event.valueStr || undefined;
  }

  setValue(): void {
    this.item = "2024-01-15";
  }

  clearValue(): void {
    this.item = undefined;
  }
}
