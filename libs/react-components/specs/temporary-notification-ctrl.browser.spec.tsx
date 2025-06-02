import { render } from "vitest-browser-react";

import { GoabTemporaryNotificationCtrl } from "../src";
import { expect, describe, it, vi } from "vitest";

type GoabTemporaryNotificationType = "basic" | "success" | "failure" | "indeterminate" | "progress";
type GoabTemporaryNotificationDuration = "short" | "medium" | "long" | number;
type GoabNotification = {
  uuid: string;
  cancelUUID?: string;
  type: GoabTemporaryNotificationType;
  message: string;
  duration?: GoabTemporaryNotificationDuration;
  actionText?: string; // Optional text for an action button
  action?: () => void; // Optional task to run when the notification is dismissed
  progress?: number;
  visible?: boolean;
  testId?: string;
}

// ============
// Test Helpers
// ============

function relay<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  data?: T,
  opts?: { bubbles?: boolean },
): boolean {
  if (!el) {
    console.error("dispatch element is null");
    return;
  }
  return el.dispatchEvent(
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

function sendTemporaryNotification(message: string, opts?: Partial<GoabNotification>): string {
  const uuid = crypto.randomUUID();
  opts = { uuid, type: "basic", ...(opts || {}) };
  relay(document.body, "goa:temp-notification", {
    message: message,
    ...opts
  }, { bubbles: true});
  return uuid;
}

function sendProgress(uuid: string, progress: number) {
  relay(document.body, "goa:temp-notification:progress", { uuid, progress }, { bubbles: true});
}

function sendTemporaryNotificationDismissal(uuid: string) {
  relay(document.body, "goa:temp-notification:dismiss", uuid, { bubbles: true});
}

function sendCancellableNotification(message: string, testId: string) {
  const uuid = sendTemporaryNotification(message, {
    actionText: "Cancel",
    testId,
    duration: 10000, // ensure that it stays visible until cancelled
    action: () => sendTemporaryNotification("Cancelled", { cancelUUID: uuid, duration: 2000 }),
  })
}

function sendCancellableNotificationWithoutNotificationResponse(message: string, testId: string) {
  const uuid = sendTemporaryNotification(message, {
    actionText: "Cancel",
    testId,
    duration: 10000, // ensure that it stays visible until cancelled
    action: () => sendTemporaryNotificationDismissal(uuid),
  })
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
      sendTemporaryNotification("This is the notification", {
        testId: "some-notification"
      });

      const notification = result.getByTestId("some-notification");
      expect(notification.elements().length).toBe(1)
    });
  });

  it("should hide notification after specified duration", async function () {
    const Component = () => {
      return <GoabTemporaryNotificationCtrl />;
    };

    const result = render(<Component />);
    const notifications = result.getByTestId("short-notification");

    // ensure notification is visible
    await vi.waitFor(async () => {
      sendTemporaryNotification("This is a short notification", {
        testId: "short-notification",
        duration: 100,
      });
      expect(notifications.elements().length).toBe(1);
    });

    // ensure notification is removed after duration
    await vi.waitFor(() => {
      expect(notifications.elements().length).toBe(0);
    })
  });

  it("should handle action button click", async function () {

    const Component = () => {
      return <GoabTemporaryNotificationCtrl verticalPosition={"top"} />;
    };

    const result = render(<Component />);
    const actionButton = result.getByRole("button");
    const actionMock = vi.fn();

    await vi.waitFor(async () => {
      sendTemporaryNotification("Notification with action", {
        testId: "action-notification",
        actionText: "Undo",
        action: actionMock,
      });

      expect(actionButton.elements().length).toBe(1);
      await actionButton.click();
      expect(actionMock).toHaveBeenCalledOnce();
    })
  });

  it("should handle action button click and cancel notification", async function () {
    const Component = () => {
      return <GoabTemporaryNotificationCtrl verticalPosition={"top"} />;
    };

    const result = render(<Component />);
    const notification = result.getByTestId("cancel-notification");
    const actionButton = result.getByRole("button");

    await vi.waitFor(async () => {
      sendCancellableNotification("Notification with cancel action", "cancel-notification");

      // Verify the notification is displayed
      expect(notification.elements().length).toBe(1);

      // Click the cancel button
      expect(actionButton.elements().length).toBe(1);
      await actionButton.click();

      // Verify the notification is removed
      await vi.waitFor(() => {
        expect(notification.elements().length).toBe(0);
      });
    });
  });

  it("should allow for dismissing of the notification without a second notification from appearing", async function () {
    const Component = () => {
      return <GoabTemporaryNotificationCtrl verticalPosition={"top"} />;
    };

    const result = render(<Component />);
    const notification = result.getByTestId("cancel-notification");
    const actionButton = result.getByRole("button");

    await vi.waitFor(async () => {
      sendCancellableNotificationWithoutNotificationResponse("Notification with cancel action", "cancel-notification");

      // Verify the notification is displayed
      expect(notification.elements().length).toBe(1);

      // Click the cancel button
      expect(actionButton.elements().length).toBe(1);
      await actionButton.click();

      // Verify the notification is removed
      await vi.waitFor(() => {
        expect(notification.elements().length).toBe(0);
      });
    });
  })

  it.skip("should handle progress updates", async function () {
    const Component = () => {
      return <GoabTemporaryNotificationCtrl />;
    };

    const result = render(<Component />);
    const progressIndicator= result.getByTestId("progress");

    const uuid = sendTemporaryNotification("some message", { testId: "some-notification", type: "progress" })

    await vi.waitFor(() => {
      sendProgress(uuid, 10);
      expect(progressIndicator.element().getAttribute("value")).toBe("10");
    });

    await vi.waitFor(() => {
      sendProgress(uuid, 100);
      expect(progressIndicator.element().getAttribute("value")).toBe("100");
    });

  });

});
