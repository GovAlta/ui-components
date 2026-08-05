import { Component } from "@angular/core";

@Component({
  selector: "app-activate-a-specific-tab-with-a-button",
  templateUrl: "./angular.html",
})
export class ActivateASpecificTabWithAButtonComponent {
  activateDetailsTab(): void {
    window.location.hash = "button-example-details";
  }
}
