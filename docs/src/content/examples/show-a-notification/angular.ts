import { Component } from "@angular/core";
import { TemporaryNotification } from "@abgov/ui-components-common";

@Component({
  selector: "app-show-a-notification",
  templateUrl: "./angular.html",
})
export class ShowANotificationComponent {
  async save(): Promise<void> {
    // await this.api.save();

    TemporaryNotification.show("Your application has been saved.", {
      type: "success",
    });
  }
}
