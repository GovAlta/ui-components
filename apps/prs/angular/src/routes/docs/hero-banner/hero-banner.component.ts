import { Component } from "@angular/core";
import { GoabButton, GoabButtonGroup, GoabHeroBanner } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-hero-banner",
  templateUrl: "./hero-banner.component.html",
  imports: [GoabButton, GoabButtonGroup, GoabHeroBanner],
})
export class DocsHeroBannerComponent {
  onHeroBannerClick(): void {
    console.log("Call to action clicked");
  }
}
