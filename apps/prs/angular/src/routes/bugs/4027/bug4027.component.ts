import { Component } from "@angular/core";
import { GoabDatePicker, GoabInputNumber, GoabText } from "@abgov/angular-components";
import {
  GoabDatePickerOnChangeDetail,
  GoabInputOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug4027",
  templateUrl: "./bug4027.component.html",
  imports: [GoabDatePicker, GoabInputNumber, GoabText],
})
export class Bug4027Component {
  value = "2025-06-15";
  comparisonValue = 42;

  onChange(detail: GoabDatePickerOnChangeDetail) {
    this.value = detail.valueStr;
  }

  onComparisonChange(detail: GoabInputOnChangeDetail) {
    this.comparisonValue = parseFloat(detail.value);
  }
}
