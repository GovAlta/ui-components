import { render } from "@testing-library/react";
import GoabTemporaryNotification from "./temporary-notification";
import { describe, it, expect, vi } from "vitest";

describe("Temporary Notification", () => {
  describe("type", () => {
    (["basic", "success", "failure"] as const).forEach((type) => {
      it(`should render ${type} notification`, async function () {
        render(
          <GoabTemporaryNotification type={type} message="Test message" />
        );
        const el = document.querySelector("goa-temp-notification");
        expect(el?.getAttribute("type")).toEqual(type);
      });
    });
  });

  it("should render with message", async () => {
    render(<GoabTemporaryNotification message="Test message" />);
    const el = document.querySelector("goa-temp-notification");
    expect(el?.getAttribute("message")).toEqual("Test message");
  });

  it("should render with duration", async () => {
    render(<GoabTemporaryNotification message="Test message" duration={5000} />);
    const el = document.querySelector("goa-temp-notification");
    expect(el?.getAttribute("duration")).toEqual("5000");
  });

  it("should render with progress", async () => {
    render(<GoabTemporaryNotification message="Test message" progress={50} />);
    const el = document.querySelector("goa-temp-notification");
    expect(el?.getAttribute("progress")).toEqual("50");
  });

  it("should render with action text", async () => {
    render(<GoabTemporaryNotification message="Test message" actionText="Dismiss" />);
    const el = document.querySelector("goa-temp-notification");
    expect(el?.getAttribute("action-text")).toEqual("Dismiss");
  });

  it("should render with visibility", async () => {
    render(<GoabTemporaryNotification message="Test message" visible={false} />);
    const el = document.querySelector("goa-temp-notification");
    expect(el?.hasAttribute("visible")).toBe(false);
  });

  it("should render with animation direction", async () => {
    render(<GoabTemporaryNotification message="Test message" animationDirection="up" />);
    const el = document.querySelector("goa-temp-notification");
    expect(el?.getAttribute("animation-direction")).toEqual("up");
  });
});
