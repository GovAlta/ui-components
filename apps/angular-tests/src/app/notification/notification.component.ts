import { GoabNotification } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-notification",
  templateUrl: "./notification.component.html",
  imports: [
    GoabNotification,
  ]
})
export class NotificationComponent {
  constructor() { }

  onDismiss() {
    console.log("dismissed");
  }
}
