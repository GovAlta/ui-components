import { Component } from "@angular/core";
import {
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
} from "@abgov/angular-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3681",
  templateUrl: "./bug3681.component.html",
  imports: [GoabDropdown, GoabDropdownItem, GoabFormItem],
})
export class Bug3681Component {
  value = "red";

  handleChange(detail: GoabDropdownOnChangeDetail) {
    this.value = detail.value ?? "";
  }
}
