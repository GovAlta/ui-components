import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import GoabxWorkSideNotificationPanel from "./work-side-notification-panel";

describe("GoabxWorkSideNotificationPanel", () => {
  it("should render with all props", () => {
    const { baseElement } = render(
      <GoabxWorkSideNotificationPanel
        heading="Notifications"
        activeTab="unread"
        testId="panel-1"
      >
        <p>Child content</p>
      </GoabxWorkSideNotificationPanel>,
    );
    const el = baseElement.querySelector("goa-work-side-notification-panel");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBe("Notifications");
    expect(el?.getAttribute("active-tab")).toBe("unread");
    expect(el?.getAttribute("testid")).toBe("panel-1");
    expect(el?.textContent).toContain("Child content");
  });

  it("should render with only children", () => {
    const { baseElement } = render(
      <GoabxWorkSideNotificationPanel>
        <div>Notification items</div>
      </GoabxWorkSideNotificationPanel>,
    );
    const el = baseElement.querySelector("goa-work-side-notification-panel");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("heading")).toBeNull();
    expect(el?.getAttribute("active-tab")).toBeNull();
    expect(el?.textContent).toContain("Notification items");
  });

  it("should handle _markAllRead event", () => {
    const onMarkAllRead = vi.fn();
    const { baseElement } = render(
      <GoabxWorkSideNotificationPanel onMarkAllRead={onMarkAllRead} />,
    );
    const el = baseElement.querySelector("goa-work-side-notification-panel");
    expect(el).toBeTruthy();

    fireEvent(el!, new CustomEvent("_markAllRead", { bubbles: true }));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });

  it("should handle _viewAll event", () => {
    const onViewAll = vi.fn();
    const { baseElement } = render(
      <GoabxWorkSideNotificationPanel onViewAll={onViewAll} />,
    );
    const el = baseElement.querySelector("goa-work-side-notification-panel");
    expect(el).toBeTruthy();

    fireEvent(el!, new CustomEvent("_viewAll", { bubbles: true }));
    expect(onViewAll).toHaveBeenCalledTimes(1);
  });
});
