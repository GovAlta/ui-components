import { Component } from "@angular/core";

@Component({
  selector: "app-start-page",
  templateUrl: "./angular.html",
  styles: [
    `
      .page-title {
        margin-bottom: var(--goa-space-l);
      }
      h2 {
        margin-top: var(--goa-space-xl);
        margin-bottom: 0;
      }
      h2 + p {
        margin-top: var(--goa-space-l);
      }
    `,
  ],
})
export class StartPageComponent {
  onClick(): void {
    console.log("Get started clicked");
  }
}
