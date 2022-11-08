import { Component } from "@angular/core";

@Component({
  selector: "abgov-button-group",
  templateUrl: "./button-group.component.html",
  styleUrls: ["./button-group.component.css"],
})
export class ButtonGroupComponent {
  constructor() {}

  onClick() {
    console.log("clicked");
  }
}
