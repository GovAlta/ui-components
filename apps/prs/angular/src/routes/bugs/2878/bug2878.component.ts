import { Component } from "@angular/core";
import { GoabBlock, GoabFormItem, GoabDatePicker } from "@abgov/angular-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "abgov-bug2878",
  templateUrl: "./bug2878.component.html",
  standalone: true,
  imports: [GoabBlock, GoabFormItem, GoabDatePicker],
})
export class Bug2878Component {
  value1?: string | Date;
  value2?: string | Date;

  onChange1(detail: GoabDatePickerOnChangeDetail) {
    console.log("Firing Calendar DatePicker");
    this.value1 = detail.value;
  }

  onChange2(detail: GoabDatePickerOnChangeDetail) {
    console.log("Firing Input DatePicker");
    this.value2 = detail.value;
  }
}
