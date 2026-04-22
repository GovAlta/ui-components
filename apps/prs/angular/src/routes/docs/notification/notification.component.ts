import { Component } from "@angular/core";
import { GoabNotification } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-notification",
  templateUrl: "./notification.component.html",
  imports: [GoabNotification],
})
export class DocsNotificationComponent {}
