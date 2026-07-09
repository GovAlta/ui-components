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
import { NgTemplateOutlet } from "@angular/common";
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
    NgTemplateOutlet,
  ],
})
export class Bug3762Component {
  isSignedIn = false;

  signIn() {
    this.isSignedIn = true;
  }

  signOut() {
    this.isSignedIn = false;
  }
}
