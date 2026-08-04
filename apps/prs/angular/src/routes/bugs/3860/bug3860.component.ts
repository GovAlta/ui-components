import { Component } from "@angular/core";
import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBlock,
  GoabButton,
  GoabDatePicker,
  GoabDetails,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabPopover,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3860",
  templateUrl: "./bug3860.component.html",
  imports: [
    GoabAppHeader,
    GoabAppHeaderMenu,
    GoabBlock,
    GoabButton,
    GoabDatePicker,
    GoabDetails,
    GoabDivider,
    GoabDropdown,
    GoabDropdownItem,
    GoabLink,
    GoabMenuAction,
    GoabMenuButton,
    GoabPopover,
    GoabText,
  ],
})
export class Bug3860Component {}
