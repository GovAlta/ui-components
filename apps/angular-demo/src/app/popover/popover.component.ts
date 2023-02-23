import { Component } from "@angular/core";

@Component({
  selector: "abgov-popover",
  templateUrl: "./popover.component.html",
})
export class PopoverComponent {
  constructor() {}

  onClick() {
    console.log("clicked");
  }
}
