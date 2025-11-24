import { Component } from "@angular/core";
import { GoabInput, GoabIcon } from "@abgov/angular-components";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-bug2404",
  standalone: true,
  templateUrl: "./bug2404.component.html",
  imports: [GoabInput, GoabIcon],
})
export class Bug2404Component {
  firstName = new FormControl("");
  lastName = new FormControl("");

  trailingIconClick() {
    console.log("Trailing Icon Clicked");
  }
}
