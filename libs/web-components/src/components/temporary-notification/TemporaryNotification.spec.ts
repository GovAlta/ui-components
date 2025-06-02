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
});
