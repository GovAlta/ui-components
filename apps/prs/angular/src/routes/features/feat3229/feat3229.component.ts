import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDivider,
  GoabText,
  GoabMenuAction,
  GoabMenuButton,
  GoabBadge,
} from "@abgov/angular-components";
import { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat3229",
  templateUrl: "./feat3229.component.html",
  imports: [
    GoabBlock,
    GoabDivider,
    GoabMenuAction,
    GoabMenuButton,
    GoabBadge,
    GoabText,
  ],
})
export class Feat3229Component {
  lastAction = "";

  handleAction(detail: GoabMenuButtonOnActionDetail, label?: string) {
    const source = label ? ` (${label})` : "";
    this.lastAction = `Action "${detail.action}"${source}`;
  }
}
