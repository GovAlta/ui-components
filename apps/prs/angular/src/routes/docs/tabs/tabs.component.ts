import { Component } from "@angular/core";
import {
  GoabBadge,
  GoabButton,
  GoabTab,
  GoabTabs,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-tabs",
  templateUrl: "./tabs.component.html",
  imports: [GoabBadge, GoabButton, GoabTab, GoabTabs, GoabText],
})
export class DocsTabsComponent {
  activateDetailsTab(): void {
    window.location.hash = "button-example-details";
  }
}
