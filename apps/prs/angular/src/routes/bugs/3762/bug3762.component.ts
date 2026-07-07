import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabContainer,
  GoabMenuAction,
  GoabMenuButton,
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
    GoabContainer,
    GoabMenuAction,
    GoabMenuButton,
    GoabText,
  ],
})
export class Bug3762Component {
  isSignedIn = false;

  signIn = () => {
    this.isSignedIn = true;
  };

  signOut = () => {
    this.isSignedIn = false;
  };
}
