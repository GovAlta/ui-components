import { Component } from "@angular/core";

@Component({
  selector: "goab-popover",
  templateUrl: "./popover.component.html",
})
export class PopoverComponent {
  constructor() {}

  onClick() {
    console.log("clicked");
  }
}
