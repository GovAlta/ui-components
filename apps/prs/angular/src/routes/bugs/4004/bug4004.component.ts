import { Component } from "@angular/core";
import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabPushDrawer,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug4004",
  templateUrl: "./bug4004.component.html",
  imports: [
    GoabBadge,
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabPushDrawer,
    GoabText,
  ],
})
export class Bug4004Component {
  stringOpen = false;
  slotOpen = false;
  longOpen = false;

  openString(): void {
    this.stringOpen = true;
  }

  closeString(): void {
    this.stringOpen = false;
  }

  openSlot(): void {
    this.slotOpen = true;
  }

  closeSlot(): void {
    this.slotOpen = false;
  }

  openLong(): void {
    this.longOpen = true;
  }

  closeLong(): void {
    this.longOpen = false;
  }
}
