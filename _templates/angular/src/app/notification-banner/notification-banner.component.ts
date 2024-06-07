import { Component } from "@angular/core";

@Component({
  selector: "goab-notification-banner",
  templateUrl: "./notification-banner.component.html"
})
export class NotificationBannerComponent {
  constructor() {}

  onDismiss() {
    console.log("dismissed");
  }
}
