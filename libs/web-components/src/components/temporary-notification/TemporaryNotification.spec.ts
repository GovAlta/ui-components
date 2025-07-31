import { render, waitFor } from "@testing-library/svelte";
import GoATemporaryNotification from "./TemporaryNotification.svelte";
import { it, describe, vi, expect } from "vitest";

describe("GoATemporaryNotification", () => {
  it("should render", async () => {
    const { findByTestId } = render(GoATemporaryNotification, {
      testid: "notification-test",
      message: "Test notification"
    });
    const notification = await findByTestId("notification-test");

    expect(notification).toBeTruthy();
    expect(notification.textContent).toContain("Test notification");
  });

  describe("types", () => {
    ["basic", "success", "failure", "indeterminate", "progress"].forEach((type) => {
      it(`should render ${type} type`, async () => {
        const { findByTestId } = render(GoATemporaryNotification, {
          testid: "notification-test",
          message: "Test notification",
          type
        });
        const notification = await findByTestId("notification-test");

        expect(notification).toBeTruthy();
        expect(notification.className).toContain(type);
      });
    });

    it("should render success type with checkmark icon", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Success notification",
        type: "success"
      });

      const icon = container.querySelector("goa-icon");
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute("type")).toBe("checkmark-circle");
    });

    it("should render failure type with close icon", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Failure notification",
        type: "failure"
      });

      const icon = container.querySelector("goa-icon");
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute("type")).toBe("close-circle");
    });

    it("should render progress type with progress bar", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Progress notification",
        type: "progress",
        progress: 50
      });

      const progressBar = container.querySelector("progress");
      expect(progressBar).toBeTruthy();
      expect(progressBar?.getAttribute("value")).toBe("50");
      expect(progressBar?.getAttribute("max")).toBe("100");
    });

    it("should render indeterminate type with indeterminate progress bar", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Indeterminate notification",
        type: "indeterminate"
      });

      const progressBar = container.querySelector("progress");
      expect(progressBar).toBeTruthy();
      expect(progressBar?.hasAttribute("value")).toBe(false);
    });
  });

  describe("visibility", () => {
    it("should be visible by default", async () => {
      const { findByTestId } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification"
      });
      const notification = await findByTestId("notification-test");

      expect(notification.classList.contains("show")).toBe(true);
      expect(notification.classList.contains("hide")).toBe(false);
    });

    it("should be hidden when visible is false", async () => {
      const { findByTestId } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification",
        visible: false
      });
      const notification = await findByTestId("notification-test");

      expect(notification.classList.contains("show")).toBe(false);
      expect(notification.classList.contains("hide")).toBe(true);
    });
  });

  describe("animation direction", () => {
    it("should use down animation by default", async () => {
      const { findByTestId } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification"
      });
      const notification = await findByTestId("notification-test");

      expect(notification.classList.contains("animate-down")).toBe(true);
      expect(notification.classList.contains("animate-up")).toBe(false);
    });

    it("should use up animation when specified", async () => {
      const { findByTestId } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification",
        animationDirection: "up"
      });
      const notification = await findByTestId("notification-test");

      expect(notification.classList.contains("animate-up")).toBe(true);
      expect(notification.classList.contains("animate-down")).toBe(false);
    });
  });

  describe("action button", () => {
    it("should render action button when actionText is provided", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification",
        actionText: "Undo"
      });

      const actionButton = container.querySelector("goa-link-button");
      expect(actionButton).toBeTruthy();
      expect(actionButton?.textContent?.trim()).toBe("Undo");
    });

    it("should not render action button when actionText is not provided", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification"
      });

      const actionButton = container.querySelector("goa-link-button");
      expect(actionButton).toBeFalsy();
    });
  });

  describe("progress", () => {
    it("should set progress value correctly", async () => {
      const { container, rerender } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Progress notification",
        type: "progress",
        progress: 25
      });

      let progressBar = container.querySelector("progress");
      expect(progressBar?.getAttribute("value")).toBe("25");

      // Test updating progress
      await rerender({ progress: 75 });
      progressBar = container.querySelector("progress");
      expect(progressBar?.getAttribute("value")).toBe("75");
    });
  });

  describe("text wrapping with long messages", () => {
    it("should display icon to the left of message with 90 character message", async () => {
      const ninetyCharMessage = "This is a test message that is exactly ninety characters long to validate text wrapping!!!";
      expect(ninetyCharMessage.length).toBe(90); // Verify message is exactly 90 characters

      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: ninetyCharMessage,
        type: "success"
      });

      const notification = container.querySelector('[data-testid="notification-test"]');
      const icon = container.querySelector("goa-icon");
      const messageSpan = container.querySelector(".message");
      const content = container.querySelector(".content");

      expect(notification).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(messageSpan).toBeTruthy();
      expect(content).toBeTruthy();
      expect(messageSpan?.textContent).toBe(ninetyCharMessage);

      // Verify that the icon and message are inside the content wrapper
      const contentChildren = Array.from(content?.children || []);
      const iconIndex = contentChildren.findIndex(child => child.tagName === "GOA-ICON");
      const messageIndex = contentChildren.findIndex(child => child.classList.contains("message"));
      
      expect(iconIndex).toBeGreaterThanOrEqual(0);
      expect(messageIndex).toBeGreaterThan(iconIndex);

      // Verify the notification has the max-width styling applied  
      expect(notification?.getAttribute("style")).toContain("max-width: 640px");
      
      // Verify that message has the correct CSS properties for text wrapping
      const messageElement = messageSpan as HTMLElement;
      const computedStyle = window.getComputedStyle(messageElement);
      expect(computedStyle.wordWrap).toBe("break-word");
      expect(computedStyle.overflowWrap).toBe("break-word");
      expect(computedStyle.minWidth).toBe("0");
    });

    it("should display icon to the left of message with very long message", async () => {
      const longMessage = "This is a much longer message that exceeds ninety characters and should definitely wrap to multiple lines when displayed in the temporary notification component with an icon present.";
      expect(longMessage.length).toBeGreaterThan(120); // Verify message is long

      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: longMessage,
        type: "failure"
      });

      const notification = container.querySelector('[data-testid="notification-test"]');
      const icon = container.querySelector("goa-icon");
      const messageSpan = container.querySelector(".message");
      const content = container.querySelector(".content");

      expect(notification).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(messageSpan).toBeTruthy();
      expect(content).toBeTruthy();
      expect(messageSpan?.textContent).toBe(longMessage);

      // Verify that the icon and message are inside the content wrapper
      const contentChildren = Array.from(content?.children || []);
      const iconIndex = contentChildren.findIndex(child => child.tagName === "GOA-ICON");
      const messageIndex = contentChildren.findIndex(child => child.classList.contains("message"));
      
      expect(iconIndex).toBeGreaterThanOrEqual(0);
      expect(messageIndex).toBeGreaterThan(iconIndex);
    });
  });

  describe("maxWidth property", () => {
    it("should use default maxWidth of 640px", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification"
      });

      const notification = container.querySelector('[data-testid="notification-test"]');
      expect(notification?.getAttribute("style")).toContain("max-width: 640px");
    });

    it("should use custom maxWidth when provided", async () => {
      const { container } = render(GoATemporaryNotification, {
        testid: "notification-test",
        message: "Test notification",
        maxWidth: "300px"
      });

      const notification = container.querySelector('[data-testid="notification-test"]');
      expect(notification?.getAttribute("style")).toContain("max-width: 300px");
    });
  });
});
