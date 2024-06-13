import { GoABButton, GoABButtonGroup } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-button-component",
  templateUrl: "./button.component.html",
  imports: [
    GoABButton,
    GoABButtonGroup,
  ]
})
export class ButtonComponent {
  constructor() { }

  onClick() {
    console.log("clicked");
  }
}
