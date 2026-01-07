import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabTabs,
  GoabTab,
  GoabButtonGroup,
  GoabButton,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat2611-tabs-disabled",
  templateUrl: "./feat2611-tabs-disabled.component.html",
  imports: [CommonModule, GoabTabs, GoabTab, GoabButtonGroup, GoabButton],
})
export class Feat2611TabsDisabledComponent {
  setHash(hash: string): void {
    window.location.hash = `#${hash}`;
  }

  clearHash(): void {
    const { pathname, search } = window.location;
    window.history.replaceState({}, "", `${pathname}${search}`);
  }
}
