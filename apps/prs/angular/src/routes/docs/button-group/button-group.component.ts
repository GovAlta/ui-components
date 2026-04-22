import { Component } from "@angular/core";
import {
  GoabButton, GoabButtonGroup, GoabDivider, GoabMenuAction, GoabMenuButton, GoabText,
} from "@abgov/angular-components";
import type { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-button-group",
  templateUrl: "./button-group.component.html",
  imports: [GoabButton, GoabButtonGroup, GoabDivider, GoabMenuAction, GoabMenuButton, GoabText],
})
export class DocsButtonGroupComponent {
  handleAction(event: GoabMenuButtonOnActionDetail): void {
    console.log("Action selected:", event.action);
  }
}
