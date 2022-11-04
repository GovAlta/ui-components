import { Component } from "@angular/core";

@Component({
  selector: "abgov-button-component",
  templateUrl: "./button-component.component.html",
  styleUrls: ["./button-component.component.css"],
})
export class ButtonComponentComponent {
  constructor() {}

  onClick() {
    console.log("clicked");
  }
}
