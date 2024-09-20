import { GoabButton, GoabButtonGroup, GoabHeroBanner } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-hero-banner",
  templateUrl: "./hero-banner.component.html",
  imports: [
    GoabHeroBanner,
    GoabButton,
    GoabButtonGroup,
  ],
})
export class HeroBannerComponent {
  constructor() { }
}
