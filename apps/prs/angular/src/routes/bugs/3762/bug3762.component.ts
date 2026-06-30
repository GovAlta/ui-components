import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabColumnLayout,
  GoabContainer,
  GoabHeroBanner,
  GoabMenuAction,
  GoabMenuButton,
  GoabPageBlock,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabText,
} from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-bug3762",
  templateUrl: "./bug3762.component.html",
  imports: [
    GoabAppHeader,
    GoabAppHeaderMenu,
    GoabBadge,
    GoabBlock,
    GoabButton,
    GoabColumnLayout,
    GoabContainer,
    GoabHeroBanner,
    GoabMenuAction,
    GoabMenuButton,
    GoabPageBlock,
    GoabSideMenu,
    GoabSideMenuGroup,
    GoabSideMenuHeading,
    GoabText,
  ],
})
export class Bug3762Component {}
