import { Component } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  GoabAccordion,
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDetails,
  GoabDrawer,
  GoabInput,
  GoabText,
  GoabTextArea,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2873",
  templateUrl: "./bug2873.component.html",
  imports: [
    GoabAccordion,
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabDetails,
    GoabDrawer,
    GoabInput,
    GoabText,
    GoabTextArea,
    NgTemplateOutlet,
  ],
})
export class Bug2873Component {
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
