import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabBlock,
  GoabText,
  GoabFormItem,
  GoabInput,
  GoabDropdown,
  GoabDropdownItem,
  GoabTemporaryNotificationCtrl,
  GoabDropdownOnChangeDetail,
} from "@abgov/angular-components";
import {
  GoabInputOnChangeDetail,
  TemporaryNotification,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat2730",
  templateUrl: "./feat2730.component.html",
  styleUrls: ["./feat2730.component.css"],
  imports: [
    CommonModule,
    GoabButton,
    GoabBlock,
    GoabText,
    GoabFormItem,
    GoabInput,
    GoabDropdown,
    GoabDropdownItem,
    GoabTemporaryNotificationCtrl,
  ],
})
export class Feat2730Component implements OnInit {
  // Controller positioning
  verticalPosition: "top" | "bottom" = "bottom";
  horizontalPosition: "left" | "center" | "right" = "center";

  // Notification settings
  message = "This is a test notification message";
  notificationType: "basic" | "success" | "failure" | "indeterminate" | "progress" =
    "basic";
  duration = 4000;
  actionText = "";
  progressValue = 0;

  // Progress simulation
  progressInterval: any;
  currentProgressUuid = "";

  // Test results
  lastNotificationUuid = "";
  notificationHistory: Array<{
    uuid: string;
    message: string;
    type: string;
    timestamp: Date;
  }> = [];

  ngOnInit() {
    // Initialize with a welcome message
    this.showWelcomeNotification();
  }

  changeMessage(details: GoabInputOnChangeDetail) {
    this.message = details.value;
  }

  changeDuration(details: GoabInputOnChangeDetail) {
    this.duration = +details.value;
  }

  changeActionText(details: GoabInputOnChangeDetail) {
    this.actionText = details.value;
  }

  // Basic notification tests
  showBasicNotification() {
    const uuid = TemporaryNotification.show(this.message, {
      type: "basic",
      duration: this.duration,
      actionText: this.actionText || undefined,
    });
    this.trackNotification(uuid, this.message, "basic");
  }

  showSuccessNotification() {
    const uuid = TemporaryNotification.show(this.message, {
      type: "success",
      duration: this.duration,
      actionText: this.actionText || undefined,
    });
    this.trackNotification(uuid, this.message, "success");
  }

  showFailureNotification() {
    const uuid = TemporaryNotification.show(this.message, {
      type: "failure",
      duration: this.duration,
      actionText: this.actionText || undefined,
    });
    this.trackNotification(uuid, this.message, "failure");
  }

  showIndeterminateNotification() {
    const uuid = TemporaryNotification.show(this.message, {
      type: "indeterminate",
      duration: this.duration,
      actionText: this.actionText || undefined,
    });
    this.trackNotification(uuid, this.message, "indeterminate");
  }

  // Progress notification tests
  startProgressNotification() {
    this.progressValue = 0;
    const uuid = TemporaryNotification.show(this.message, {
      type: "progress",
      duration: undefined, // No auto-dismiss for progress
      actionText: this.actionText || undefined,
    });
    this.currentProgressUuid = uuid;
    this.trackNotification(uuid, this.message, "progress");

    // Simulate progress updates
    this.progressInterval = setInterval(() => {
      this.progressValue += 10;
      TemporaryNotification.setProgress(uuid, this.progressValue);

      if (this.progressValue >= 100) {
        clearInterval(this.progressInterval);
        this.progressValue = 0;
        this.currentProgressUuid = "";
      }
    }, 500);
  }

  stopProgressNotification() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressValue = 0;
      this.currentProgressUuid = "";
    }
  }

  // Queue testing
  showMultipleNotifications() {
    const messages = [
      "First notification in queue",
      "Second notification in queue",
      "Third notification in queue",
      "Fourth notification in queue",
      "Fifth notification in queue",
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        const uuid = TemporaryNotification.show(msg, {
          type: "basic",
          duration: 2000,
        });
        this.trackNotification(uuid, msg, "basic");
      }, index * 500);
    });
  }

  // Action testing
  showNotificationWithAction() {
    const uuid = TemporaryNotification.show("Would you like to undo this action?", {
      type: "basic",
      duration: 8000,
      actionText: "Undo",
      action: () => {
        console.log("Undo action clicked!");
        TemporaryNotification.show("Action undone successfully!", {
          type: "success",
          duration: 3000,
        });
      },
    });
    this.trackNotification(
      uuid,
      "Would you like to undo this action?",
      "basic with action",
    );
  }

  // Cancel/replace testing
  showCancellableNotification() {
    const uuid = TemporaryNotification.show("This notification can be cancelled", {
      type: "basic",
      duration: 10000,
    });
    this.lastNotificationUuid = uuid;
    this.trackNotification(uuid, "This notification can be cancelled", "basic");
  }

  cancelLastNotification() {
    if (this.lastNotificationUuid) {
      TemporaryNotification.show("Previous notification cancelled", {
        type: "success",
        cancelUUID: this.lastNotificationUuid,
        duration: 3000,
      });
      this.lastNotificationUuid = "";
    }
  }

  // Welcome notification
  showWelcomeNotification() {
    const uuid = TemporaryNotification.show(
      "Welcome to the Temporary Notification test page! 🎉",
      {
        type: "success",
        duration: 5000,
      },
    );
    this.trackNotification(
      uuid,
      "Welcome to the Temporary Notification test page! 🎉",
      "success",
    );
  }

  // Utility methods
  private trackNotification(uuid: string, message: string, type: string) {
    this.lastNotificationUuid = uuid;
    this.notificationHistory.unshift({
      uuid,
      message,
      type,
      timestamp: new Date(),
    });

    // Keep only last 10 notifications
    if (this.notificationHistory.length > 10) {
      this.notificationHistory = this.notificationHistory.slice(0, 10);
    }
  }

  clearHistory() {
    this.notificationHistory = [];
  }

  // Duration presets
  setDurationShort() {
    this.duration = 2000;
  }

  setDurationMedium() {
    this.duration = 4000;
  }

  setDurationLong() {
    this.duration = 6000;
  }

  setDurationCustom() {
    this.duration = 8000;
  }

  // Dropdown change handlers
  onVerticalPositionChange(details: GoabDropdownOnChangeDetail) {
    this.verticalPosition = details.value as "top" | "bottom";
  }

  onHorizontalPositionChange(details: GoabDropdownOnChangeDetail) {
    this.horizontalPosition = details.value as "left" | "center" | "right";
  }
}
