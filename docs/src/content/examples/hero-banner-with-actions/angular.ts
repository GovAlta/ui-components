import { Component } from "@angular/core";

@Component({
  selector: "app-hero-banner-with-actions",
  templateUrl: "./angular.html",
})
export class HeroBannerWithActionsComponent {
  onClick(): void {
    console.log("Call to action clicked");
  }
}
