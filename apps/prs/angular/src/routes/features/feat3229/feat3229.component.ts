import { Component, OnInit, OnDestroy } from "@angular/core";
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
export class Feat3229Component implements OnInit, OnDestroy {
  private v2TokensLink: HTMLLinkElement | null = null;
  lastAction = "";

  ngOnInit() {
    this.v2TokensLink = document.createElement("link");
    this.v2TokensLink.rel = "stylesheet";
    this.v2TokensLink.href = "/v2-tokens/tokens.css";
    document.head.appendChild(this.v2TokensLink);
  }

  ngOnDestroy() {
    if (this.v2TokensLink) {
      document.head.removeChild(this.v2TokensLink);
      this.v2TokensLink = null;
    }
  }

  handleAction(detail: GoabMenuButtonOnActionDetail, label?: string) {
    const source = label ? ` (${label})` : "";
    this.lastAction = `Action "${detail.action}"${source}`;
  }
}
