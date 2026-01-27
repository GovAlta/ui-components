import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabDatePickerOnChangeDetail,
  GoabFormItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3275",
  templateUrl: "./bug3275.component.html",
  imports: [CommonModule, GoabButton, GoabButtonGroup, GoabDatePicker, GoabFormItem],
})
export class Bug3275Component {
  inputValue = "";

  handleChange(detail: GoabDatePickerOnChangeDetail) {
    this.inputValue = detail.valueStr ?? "";
  }

  setValue(value: string) {
    this.inputValue = value;
  }
}
