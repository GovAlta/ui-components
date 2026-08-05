import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabInput,
  GoabText,
  GoabTextArea,
} from "@abgov/angular-components";
import {
  GoabDropdownOnChangeDetail,
  GoabDropdownMultiselectOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug-4198",
  templateUrl: "./bug4198.component.html",
  imports: [
    GoabBlock,
    GoabDivider,
    GoabDropdown,
    GoabDropdownItem,
    GoabDropdownMultiselect,
    GoabFormItem,
    GoabInput,
    GoabText,
    GoabTextArea,
  ],
})
export class Bug4198Component {
  emptyCity = "";
  filledCity = "calgary";
  openCity = "";
  cities: string[] = [];
  note = "";
  comments = "";

  onEmptyCityChange(detail: GoabDropdownOnChangeDetail) {
    this.emptyCity = detail.value ?? "";
  }

  onFilledCityChange(detail: GoabDropdownOnChangeDetail) {
    this.filledCity = detail.value ?? "";
  }

  onOpenCityChange(detail: GoabDropdownOnChangeDetail) {
    this.openCity = detail.value ?? "";
  }

  onCitiesChange(detail: GoabDropdownMultiselectOnChangeDetail) {
    this.cities = detail.value;
  }
}
