import { Component } from "@angular/core";
import type { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-ask-for-birthday",
  templateUrl: "./angular.html",
})
export class AskForBirthdayComponent {
  birthdate: string | undefined;

  onDateChange(event: GoabDatePickerOnChangeDetail): void {
    this.birthdate = event.valueStr || undefined;
  }
}
