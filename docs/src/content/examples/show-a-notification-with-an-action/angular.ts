import { Component } from "@angular/core";
import { TemporaryNotification } from "@abgov/ui-components-common";

@Component({
  selector: "app-show-a-notification-with-an-action",
  templateUrl: "./angular.html",
})
export class ShowANotificationWithAnActionComponent {
  comment(): void {
    const uuid = TemporaryNotification.show(
      "Edna Mode commented on your assigned case.",
      {
        actionText: "View",
        action: () => {
          TemporaryNotification.dismiss(uuid);
        },
      },
    );
  }
}
