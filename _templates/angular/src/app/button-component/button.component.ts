import { Component } from "@angular/core";

@Component({
  selector: "goab-button-component",
  templateUrl: "./button.component.html",
})
export class ButtonComponent {
  constructor() {}

  onClick() {
    console.log("clicked");
  }
}
