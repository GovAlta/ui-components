import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
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
    CommonModule,
    GoabAccordion,
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabDetails,
    GoabDrawer,
    GoabInput,
    GoabText,
    GoabTextArea,
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
