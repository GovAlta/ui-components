import { Component } from "@angular/core";

@Component({
  selector: "app-review-page",
  templateUrl: "./angular.html",
  styles: [
    `
      h2.section-title {
        margin-top: 0;
        margin-bottom: 0;
      }
      h2.section-title + h3 {
        margin-top: var(--goa-space-l);
        color: var(--goa-color-text-secondary);
      }
    `,
  ],
})
export class ReviewPageComponent {
  onChangeClick(): void {
    console.log("Change clicked");
  }

  onConfirmClick(): void {
    console.log("Confirm clicked");
  }

  onBackClick(): void {
    console.log("Back clicked");
  }
}
