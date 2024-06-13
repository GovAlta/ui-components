import { GoABButton, GoABButtonGroup, GoABHeroBanner, GoABHeroBannerActions } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-hero-banner",
  templateUrl: "./hero-banner.component.html",
  imports: [
    GoABHeroBanner,
    GoABHeroBannerActions,
    GoABButton,
    GoABButtonGroup,
  ],
})
export class HeroBannerComponent {
  constructor() { }
}
