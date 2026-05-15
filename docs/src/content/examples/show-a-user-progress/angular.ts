import { Component } from "@angular/core";
import { TemporaryNotification } from "@abgov/ui-components-common";

@Component({
  selector: "app-show-a-user-progress",
  templateUrl: "./angular.html",
})
export class ShowAUserProgressComponent {
  async downloadReportAPI(notificationUuid: string): Promise<Error | undefined> {
    // Perform your API call here with progress tracking
    // Update progress as download progresses (0-100)
    TemporaryNotification.setProgress(notificationUuid, 25);
    // ... continue API work ...
    TemporaryNotification.setProgress(notificationUuid, 50);
    // ... continue API work ...
    TemporaryNotification.setProgress(notificationUuid, 75);
    // ... complete API work ...
    TemporaryNotification.setProgress(notificationUuid, 100);
    return undefined;
  }

  async downloadReport(): Promise<void> {
    const uuid = TemporaryNotification.show("Downloading report D-23459", {
      type: "progress",
      actionText: "Cancel",
      action: () => {
        TemporaryNotification.dismiss(uuid);
      },
    });

    const err = await this.downloadReportAPI(uuid);

    if (err) {
      TemporaryNotification.show("Download failed", {
        type: "error",
        duration: "medium",
        cancelUUID: uuid,
      });
    } else {
      TemporaryNotification.show("Report downloaded", {
        type: "success",
        duration: "medium",
        actionText: "View",
        action: () => {
          console.log("View report clicked!");
        },
        cancelUUID: uuid,
      });
    }
  }
}
