import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import GoabWorkSideNotificationItem from "./work-side-notification-item";

describe("GoabWorkSideNotificationItem", () => {
  it("should render with all props", () => {
    const { baseElement } = render(
      <GoabWorkSideNotificationItem
        type="warning"
        timestamp="2026-02-10T12:00:00Z"
        title="Action required"
        description="Please review the pending request."
        readStatus="unread"
        priority="urgent"
        testId="noti-1"
      />,
    );
    const el = baseElement.querySelector("goa-work-side-notification-item");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("type")).toBe("warning");
    expect(el?.getAttribute("timestamp")).toBe("2026-02-10T12:00:00Z");
    expect(el?.getAttribute("title")).toBe("Action required");
    expect(el?.getAttribute("description")).toBe("Please review the pending request.");
    expect(el?.getAttribute("read-status")).toBe("unread");
    expect(el?.getAttribute("priority")).toBe("urgent");
    expect(el?.getAttribute("testid")).toBe("noti-1");
  });

  it("should render with only required props", () => {
    const { baseElement } = render(
      <GoabWorkSideNotificationItem description="A simple notification." />,
    );
    const el = baseElement.querySelector("goa-work-side-notification-item");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("description")).toBe("A simple notification.");
    expect(el?.getAttribute("type")).toBeNull();
    expect(el?.getAttribute("read-status")).toBeNull();
    expect(el?.getAttribute("priority")).toBeNull();
  });

  it("should handle _click event", () => {
    const onClick = vi.fn();
    const { baseElement } = render(
      <GoabWorkSideNotificationItem
        description="Clickable notification."
        testId="noti-click"
        onClick={onClick}
      />,
    );
    const el = baseElement.querySelector("goa-work-side-notification-item");
    expect(el).toBeTruthy();

    fireEvent(el!, new CustomEvent("_click", { bubbles: true }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
