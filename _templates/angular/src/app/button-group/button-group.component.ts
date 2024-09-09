import { GoabButton, GoabButtonGroup } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-button-group",
  templateUrl: "./button-group.component.html",
  imports: [
    GoabButton,
    GoabButtonGroup,
  ]
})
export class ButtonGroupComponent {
  constructor() { }

  onClick() {
    console.log("clicked");
  }
}
