import { Component } from "@angular/core";
import { GoabButton, GoabPopover, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-popover",
  templateUrl: "./popover.component.html",
  imports: [GoabButton, GoabPopover, GoabText],
})
export class DocsPopoverComponent {}
