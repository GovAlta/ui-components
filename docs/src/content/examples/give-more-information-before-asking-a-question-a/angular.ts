import { Component } from "@angular/core";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-give-background-info",
  templateUrl: "./angular.html",
  styles: [
    `
      h2.section-title {
        margin-bottom: var(--goa-space-l);
      }
      a.back-link::before {
        content: "";
        display: inline-block;
        width: 42px;
        height: 24px;
        vertical-align: middle;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 2 22 22" fill="none" stroke="%230070C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>')
          center center no-repeat;
      }
      a.back-link:visited::before,
      a.back-link:hover::before {
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 2 22 22" fill="none" stroke="%23004f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>')
          center center no-repeat;
      }
      a.back-link {
        margin-top: var(--goa-space-m);
      }
      :host a.back-link + h2 {
        margin-top: var(--goa-space-2xl);
      }
    `,
  ],
})
export class GiveBackgroundInfoComponent {
  selectedValue = "";

  onChange(event: GoabRadioGroupOnChangeDetail): void {
    this.selectedValue = event.value as string;
  }

  onSubmit(): void {
    console.log("Selected:", this.selectedValue);
  }
}
