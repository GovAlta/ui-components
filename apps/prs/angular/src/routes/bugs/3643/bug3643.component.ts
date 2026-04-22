import { Component } from "@angular/core";
import { GoabButton, GoabPopover, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3643",
  templateUrl: "./bug3643.component.html",
  imports: [GoabButton, GoabPopover, GoabText],
})
export class Bug3643Component {}
