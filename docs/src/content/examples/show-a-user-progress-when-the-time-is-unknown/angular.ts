import { Component } from "@angular/core";
import { TemporaryNotification } from "@abgov/ui-components-common";

@Component({
  selector: "app-show-a-user-progress-when-time-unknown",
  templateUrl: "./angular.html",
})
export class ShowAUserProgressWhenTimeUnknownComponent {
  async searchCMS(): Promise<Error | undefined> {
    // Perform your API call here
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return undefined;
  }

  async search(): Promise<void> {
    const uuid = TemporaryNotification.show("Searching case management system...", {
      type: "indeterminate",
      actionText: "Cancel",
      action: () => {
        TemporaryNotification.dismiss(uuid);
      },
    });

    const err = await this.searchCMS();
    if (err) {
      TemporaryNotification.show("Could not connect to case history", {
        type: "failure",
        duration: "medium",
        cancelUUID: uuid,
      });
    } else {
      TemporaryNotification.show("Search complete - 47 records found", {
        type: "success",
        duration: "medium",
        actionText: "View",
        action: () => {
          console.log("View search results clicked!");
        },
        cancelUUID: uuid,
      });
    }
  }
}
