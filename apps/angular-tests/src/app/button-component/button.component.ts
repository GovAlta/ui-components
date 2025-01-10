import { GoabButton, GoabButtonGroup } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-button-component",
  templateUrl: "./button.component.html",
  imports: [
    GoabButton,
    GoabButtonGroup,
  ]
})
export class ButtonComponent {
  constructor() { }

  onClick() {
    console.log("clicked");
  }
}
