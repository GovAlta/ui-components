import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabButton,
  GoabDrawer,
  GoabFormItem,
  GoabGrid,
  GoabInput,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2943",
  templateUrl: "./bug2943.component.html",
  styleUrls: ["./bug2943.component.css"],
  imports: [
    CommonModule,
    GoabBlock,
    GoabButton,
    GoabDrawer,
    GoabFormItem,
    GoabGrid,
    GoabInput,
    GoabText,
  ],
})
export class Bug2943Component {
  bottomDrawerOpen = signal(false);
  sideDrawerOpen = signal(false);

  toggleBottomDrawer() {
    this.bottomDrawerOpen.update((open) => !open);
  }

  toggleSideDrawer() {
    this.sideDrawerOpen.update((open) => !open);
  }
}
