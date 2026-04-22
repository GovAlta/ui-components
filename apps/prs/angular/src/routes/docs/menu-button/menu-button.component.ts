import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabMenuAction, GoabMenuButton } from "@abgov/angular-components";
import type { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-menu-button",
  templateUrl: "./menu-button.component.html",
  imports: [CommonModule, GoabMenuButton, GoabMenuAction],
})
export class DocsMenuButtonComponent {
  handleAction(detail: GoabMenuButtonOnActionDetail): void {
    console.log("action", detail.action);
  }
}
