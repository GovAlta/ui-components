import { GoabBlock, GoabButton, GoabButtonGroup, GoabPopover, GoabSpacer } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-popover",
  templateUrl: "./popover.component.html",
  imports: [
    GoabPopover,
    GoabButton,
    GoabButtonGroup,
    GoabBlock,
    GoabSpacer,
  ]
})
export class PopoverComponent {
  constructor() { }

  onClick() {
    console.log("clicked");
  }
}
