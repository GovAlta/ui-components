import { Component } from "@angular/core";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-confirm-a-change",
  templateUrl: "./angular.html",
})
export class ConfirmAChangeComponent {
  open = false;
  effectiveDate = this.formatDate(new Date());

  toggleModal(): void {
    this.open = !this.open;
  }

  onChangeEffectiveDate(event: GoabDatePickerOnChangeDetail): void {
    this.effectiveDate = event.valueStr;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
