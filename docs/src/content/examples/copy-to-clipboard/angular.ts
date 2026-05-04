import { Component } from "@angular/core";

@Component({
  selector: "app-copy-to-clipboard",
  templateUrl: "./angular.html",
  styles: [
    `
      .token-block {
        background-color: var(--goa-color-interactive-default);
        height: 22px;
        width: 24px;
        border-radius: var(--goa-border-radius-s);
      }
    `,
  ],
})
export class CopyToClipboardComponent {
  isCopied = false;

  copyCode(): void {
    const codeToCopy = "$goa-color-interactive-default";
    navigator.clipboard.writeText(codeToCopy).then(() => {
      this.isCopied = true;
      setTimeout(() => (this.isCopied = false), 1000);
    });
  }
}
