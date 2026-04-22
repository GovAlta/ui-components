import { Component } from "@angular/core";
import { GoabButton, GoabTemporaryNotificationCtrl } from "@abgov/angular-components";
import { TemporaryNotification } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-temporary-notification",
  templateUrl: "./temporary-notification.component.html",
  imports: [GoabButton, GoabTemporaryNotificationCtrl],
})
export class DocsTemporaryNotificationComponent {
  showNotification(): void {
    TemporaryNotification.show("You have a notification", {
      type: "basic",
      duration: "short",
    });
  }

  show(message: string, type: string): void {
    TemporaryNotification.show(message, { type: type as any });
  }

  showProgress(): void {
    const uuid = TemporaryNotification.show("Uploading file...", { type: "progress" });
    TemporaryNotification.setProgress(uuid, 65);
  }

  showIndeterminate(): void {
    TemporaryNotification.show("Processing your request...", { type: "indeterminate" });
  }

  // Examples
  async save(): Promise<void> {
    TemporaryNotification.show("Your application has been saved.", {
      type: "success",
    });
  }

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

  async searchCMS(): Promise<Error | undefined> {
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

  async downloadReportAPI(notificationUuid: string): Promise<Error | undefined> {
    TemporaryNotification.setProgress(notificationUuid, 25);
    await new Promise((resolve) => setTimeout(resolve, 500));
    TemporaryNotification.setProgress(notificationUuid, 50);
    await new Promise((resolve) => setTimeout(resolve, 500));
    TemporaryNotification.setProgress(notificationUuid, 75);
    await new Promise((resolve) => setTimeout(resolve, 500));
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
        type: "failure",
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
