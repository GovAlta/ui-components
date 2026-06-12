import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabContainer,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
} from "@abgov/angular-components";
import type {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3763",
  templateUrl: "./bug3763.component.html",
  imports: [
    CommonModule,
    GoabContainer,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
  ],
})
export class Bug3763Component {
  province = "";
  halfProvince = "";
  date = "";
  halfDate = "";
  wideDate = "";
  invalidDate = "";

  handleProvinceChange(detail: GoabDropdownOnChangeDetail): void {
    this.province = detail.value || "";
  }

  handleHalfProvinceChange(detail: GoabDropdownOnChangeDetail): void {
    this.halfProvince = detail.value || "";
  }

  handleDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.date = detail.valueStr || "";
  }

  handleHalfDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.halfDate = detail.valueStr || "";
  }

  handleWideDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.wideDate = detail.valueStr || "";
  }

  handleInvalidDateChange(detail: GoabDatePickerOnChangeDetail): void {
    this.invalidDate = detail.valueStr || "";
  }
}
