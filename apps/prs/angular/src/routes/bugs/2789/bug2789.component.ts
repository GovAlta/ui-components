import { Component } from "@angular/core";
import { GoabFormItem, GoabDropdown, GoabDropdownItem } from "@abgov/angular-components";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-accordion",
  standalone: true,
  templateUrl: "./bug2789.component.html",
  imports: [GoabFormItem, GoabDropdown, GoabDropdownItem],
})
export class Bug2789Component {
  firstName = new FormControl("");
  lastName = new FormControl("");

  trailingIconClick() {
    console.log("Trailing Icon Clicked");
  }
}
