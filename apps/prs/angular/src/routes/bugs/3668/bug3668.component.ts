import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabTemporaryNotificationCtrl,
  GoabText,
} from "@abgov/angular-components";
import { TemporaryNotification } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3668",
  templateUrl: "./bug3668.component.html",
  imports: [
    GoabBlock,
    GoabButton,
    GoabDetails,
    GoabDivider,
    GoabLink,
    GoabTemporaryNotificationCtrl,
    GoabText,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug3668Component {
  underlyingTargetClicks = 0;

  showBasic() {
    TemporaryNotification.show("Basic notification for comparison", {
      type: "basic",
      duration: 8000,
    });
  }

  showSuccess() {
    TemporaryNotification.show("Successfully saved", {
      type: "success",
      duration: 8000,
    });
  }

  showFailure() {
    TemporaryNotification.show("Something went wrong", {
      type: "failure",
      duration: 8000,
    });
  }

  showIndeterminate() {
    const uuid = TemporaryNotification.show("Loading something indeterminate...", {
      type: "indeterminate",
    });
    setTimeout(() => TemporaryNotification.dismiss(uuid), 5000);
  }

  showProgress() {
    const uuid = TemporaryNotification.show("Uploading file...", {
      type: "progress",
    });
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      TemporaryNotification.setProgress(uuid, value);
      if (value >= 100) clearInterval(interval);
    }, 500);
  }

  showWithAction() {
    TemporaryNotification.show("Item deleted", {
      type: "basic",
      duration: 8000,
      actionText: "Undo",
    });
  }

  showLongContent() {
    TemporaryNotification.show(
      "Your application for the Alberta Works program has been successfully submitted and is now being reviewed by our team. You will receive a confirmation email shortly.",
      { type: "basic", duration: 15000, actionText: "View details" },
    );
  }

  showControllerOverlayIssue() {
    TemporaryNotification.show(
      "Overlay repro: while this centered notification is visible, try clicking the underlying target button at the bottom-right.",
      { type: "basic", duration: 12000 },
    );
  }

  incrementUnderlyingTargetClicks() {
    this.underlyingTargetClicks += 1;
  }

  resetUnderlyingTargetClicks() {
    this.underlyingTargetClicks = 0;
  }
}
