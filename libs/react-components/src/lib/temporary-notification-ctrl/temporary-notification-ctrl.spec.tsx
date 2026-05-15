import { render } from "@testing-library/react";
import GoabTemporaryNotificationCtrl from "./temporary-notification-ctrl";
import { describe, it, expect } from "vitest";

describe("Temporary Notification Controller", () => {
  describe("position", () => {
    it("should render with default positions", async function () {
      render(<GoabTemporaryNotificationCtrl />);
      const el = document.querySelector("goa-temp-notification-ctrl");
      expect(el?.getAttribute("vertical-position")).toEqual("bottom");
      expect(el?.getAttribute("horizontal-position")).toEqual("center");
    });

    it("should render with custom positions", async function () {
      render(
        <GoabTemporaryNotificationCtrl
          verticalPosition="top"
          horizontalPosition="left"
        />
      );
      const el = document.querySelector("goa-temp-notification-ctrl");
      expect(el?.getAttribute("vertical-position")).toEqual("top");
      expect(el?.getAttribute("horizontal-position")).toEqual("left");
    });
  });

  it("should render with testId", async () => {
    render(<GoabTemporaryNotificationCtrl testId="test-id" />);
    const el = document.querySelector("goa-temp-notification-ctrl");
    expect(el?.getAttribute("testid")).toEqual("test-id");
  });
});
