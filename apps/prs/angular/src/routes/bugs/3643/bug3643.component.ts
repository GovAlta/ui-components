import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabPopover,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3643",
  templateUrl: "./bug3643.component.html",
  imports: [
    GoabBlock,
    GoabButton,
    GoabDetails,
    GoabDivider,
    GoabLink,
    GoabMenuAction,
    GoabMenuButton,
    GoabPopover,
    GoabText,
  ],
})
export class Bug3643Component {}
