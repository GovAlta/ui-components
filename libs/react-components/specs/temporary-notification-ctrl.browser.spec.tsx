import { render } from "vitest-browser-react";

import { GoabTemporaryNotificationCtrl } from "../src";
import { expect, describe, it, vi } from "vitest";

type GoabTemporaryNotificationType = "basic" | "success" | "failure" | "indeterminate" | "progress";
type GoabTemporaryNotificationDuration = "short" | "medium" | "long" | number;
type GoabNotification = {
  type: GoabTemporaryNotificationType;
  message: string;
  duration?: GoabTemporaryNotificationDuration;
  actionText?: string; // Optional text for an action button
  action?: () => void; // Optional task to run when the notification is dismissed
  progress?: number;
  visible?: boolean;
  testId?: string;
}

function relay<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  data?: T,
  opts?: { bubbles?: boolean },
) {
  if (!el) {
    console.error("dispatch element is null");
    return;
  }
  el.dispatchEvent(
    new CustomEvent<{ action: string; data?: T }>("msg", {
      composed: true,
      bubbles: opts?.bubbles,
      detail: {
        action: eventName,
        data,
      },
    }),
  );
}

function sendNotification(message: string, opts?: Partial<GoabNotification>) {
  opts = { message, type: "basic", ...(opts || {}) };
  relay(document.body, "goa:temp-notification", opts, { bubbles: true});
}

describe("Temporary Notification Controller", () => {

  describe("position", () => {
    it("should render with default positions", async function () {
      const Component = () => {
        return <GoabTemporaryNotificationCtrl testId="notification-ctrl" />;
      };

      const result = render(<Component />);
      const notificationController = result.getByTestId("notification-ctrl");

      await vi.waitFor(() => {
        expect(notificationController.element()).toBeTruthy();
        expect(notificationController.element().classList.contains("pos-center")).toBeTruthy();
        expect(notificationController.element().classList.contains("pos-bottom")).toBeTruthy();
      });
    });

    it("should render with custom positions", async function () {
      const Component = () => {
        return (
          <GoabTemporaryNotificationCtrl
            testId="notification-ctrl"
            verticalPosition="top"
            horizontalPosition="left"
          />
        );
      };

      const result = render(<Component />);
      const notificationController = result.getByTestId("notification-ctrl");

      await vi.waitFor(() => {
        expect(notificationController.element()).toBeTruthy();
        expect(notificationController.element().classList.contains("pos-top")).toBeTruthy();
        expect(notificationController.element().classList.contains("pos-left")).toBeTruthy();
      });
    });
  });

  it("should show notification", async function () {
    const Component = () => {
      return <GoabTemporaryNotificationCtrl />;
    };

    const result = render(<Component />);

    await vi.waitFor(() => {
      sendNotification("This is the notification", {
        testId: "some-notification"
      });

      const notification = result.getByTestId("some-notification");
      expect(notification.element()).toBeTruthy()
    });
  });


  it("should hide notification after specified duration", async function () {
    const Component = () => {
      return <GoabTemporaryNotificationCtrl />;
    };

    const result = render(<Component />);
    const notification = result.getByTestId("short-notification");

    await vi.waitFor(async () => {
      sendNotification("This is a short notification", {
        testId: "short-notification",
        duration: 100,
      });

      expect(notification.element()).toBeTruthy();
    });

    await vi.waitFor(() => {
      expect(notification.elements().length).toBe(0);
    })
  });

  // create a test for when an action is clicked
  // create a test for when an action is clicked that cancels the notification

});
