import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownOnChangeDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2502",
  templateUrl: "./bug2502.component.html",
  imports: [GoabBlock, GoabFormItem, GoabDropdown, GoabDropdownItem],
})
export class Bug2502Component {
  onDropdownChange(details: GoabDropdownOnChangeDetail) {
    console.log(`Dropdown ${details.name} selected value:`, details.value);
  }
}
