import { Component } from "@angular/core";

@Component({
  selector: "app-error-page-404",
  templateUrl: "./angular.html",
  styles: [
    `
      .error-page-content {
        text-align: center;
      }
      .error-page-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 7.5rem;
        height: 7.5rem;
        border-radius: 50%;
        background-color: var(--goa-color-greyscale-100);
      }
      /* Icon scaled beyond xlarge (2.5rem cap) to match the page-scale visual weight. */
      /* Tracked in icon-sizes-above-xlarge gap ticket. */
      .error-page-icon goa-icon,
      .error-page-icon goab-icon {
        transform: scale(1.35);
      }
      .error-page-underline {
        width: 6.875rem;
        height: var(--goa-space-xs);
        background-color: var(--goa-color-info-default);
      }
    `,
  ],
})
export class PageNotFoundComponent {
  goHome() {
    window.location.href = "/";
  }
}
