import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3932",
  templateUrl: "./bug3932.component.html",
  imports: [
    GoabBlock,
    GoabText,
    GoabWorkSideMenu,
    GoabWorkSideMenuGroup,
    GoabWorkSideMenuItem,
  ],
})
export class Bug3932Component {}