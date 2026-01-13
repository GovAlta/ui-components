import { Component } from "@angular/core";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-confirm-a-change",
  templateUrl: "./angular.html",
})
export class ConfirmAChangeComponent {
  open = false;
  effectiveDate = new Date();

  toggleModal(): void {
    this.open = !this.open;
  }

  onChangeEffectiveDate(event: GoabDatePickerOnChangeDetail): void {
    this.effectiveDate = event.value as Date;
  }
}
