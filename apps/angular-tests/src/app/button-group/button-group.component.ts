import { GoABButton, GoABButtonGroup } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-button-group",
  templateUrl: "./button-group.component.html",
  imports: [
    GoABButton,
    GoABButtonGroup,
  ]
})
export class ButtonGroupComponent {
  constructor() { }

  onClick() {
    console.log("clicked");
  }
}
