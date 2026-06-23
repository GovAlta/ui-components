import { Component } from "@angular/core";
import {
  GoabDatePicker,
  GoabDivider,
  GoabFormItem,
} from "@abgov/angular-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3815",
  templateUrl: "./bug3815.component.html",
  imports: [GoabDatePicker, GoabDivider, GoabFormItem],
})
export class Bug3815Component {
  date?: string;

  onDateChange(detail: GoabDatePickerOnChangeDetail) {
    this.date = detail.valueStr || undefined;
  }
}
