import { Component } from "@angular/core";

@Component({
  selector: "app-display-user-information",
  templateUrl: "./angular.html"
})
export class DisplayUserInformationComponent {
  onAddToCalendar(): void {
    console.log("Add to calendar clicked");
  }
}
