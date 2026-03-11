import { Component } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDrawer,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3215",
  templateUrl: "./bug3215.component.html",
  imports: [GoabButton, GoabButtonGroup, GoabDrawer, GoabText, NgTemplateOutlet],
})
export class Bug3215Component {
  rightDrawerOpen = false;
  bottomDrawerOpen = false;

  openRightDrawer() {
    this.rightDrawerOpen = true;
  }

  openBottomDrawer() {
    this.bottomDrawerOpen = true;
  }

  closeRightDrawer() {
    this.rightDrawerOpen = false;
  }

  closeBottomDrawer() {
    this.bottomDrawerOpen = false;
  }
}
