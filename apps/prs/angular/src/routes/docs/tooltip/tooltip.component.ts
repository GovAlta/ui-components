import { Component } from "@angular/core";
import {
  GoabBlock, GoabButton, GoabButtonGroup, GoabContainer, GoabIconButton,
  GoabText, GoabTooltip,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-tooltip",
  templateUrl: "./tooltip.component.html",
  imports: [
    GoabBlock, GoabButton, GoabButtonGroup, GoabContainer, GoabIconButton,
    GoabText, GoabTooltip,
  ],
  styles: [`
    .token-block {
      background-color: var(--goa-color-interactive-default);
      height: 22px;
      width: 24px;
      border-radius: var(--goa-border-radius-s);
    }
  `],
})
export class DocsTooltipComponent {
  isCopied = false;

  copyCode(): void {
    const codeToCopy = "$goa-color-interactive-default";
    navigator.clipboard.writeText(codeToCopy).then(() => {
      this.isCopied = true;
      setTimeout(() => this.isCopied = false, 1000);
    });
  }
}
