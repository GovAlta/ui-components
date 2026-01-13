import { Component } from "@angular/core";

@Component({
  selector: "app-feedback-link",
  templateUrl: "./angular.html",
})
export class FeedbackLinkComponent {
  onFeedbackClick(): void {
    console.log("Feedback clicked");
    alert("Thank you for your feedback!");
  }
}
