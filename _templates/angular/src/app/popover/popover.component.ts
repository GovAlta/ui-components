import { GoABBlock, GoABButton, GoABButtonGroup, GoABIconButton, GoABPopover, GoABSpacer } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-popover",
  templateUrl: "./popover.component.html",
  imports: [
    GoABPopover,
    GoABButton,
    GoABButtonGroup,
    GoABBlock,
    GoABSpacer,
  ]
})
export class PopoverComponent {
  constructor() { }

  onClick() {
    console.log("clicked");
  }
}
