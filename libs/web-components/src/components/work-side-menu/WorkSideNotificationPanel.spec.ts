import { render, waitFor } from "@testing-library/svelte";
import { it, describe, expect, vi } from "vitest";
import WorkSideNotificationPanelWrapper from "./WorkSideNotificationPanelWrapper.test.svelte";

describe("WorkSideNotificationPanel", () => {
  it("should render correctly, track items, and handle events", async () => {
    const { container } = render(WorkSideNotificationPanelWrapper, {
      heading: "My Notifications",
      testid: "panel-test",
      activeTab: "unread",
    });

    const panel = container.querySelector('[data-testid="panel-test"]');
    expect(panel).toBeTruthy();

    // Heading
    expect(container.querySelector("goa-text")?.textContent).toContain("My Notifications");

    // Tabs
    expect(container.querySelectorAll("goa-tab").length).toBe(3);

    // Footer
    const footerButtons = container.querySelectorAll("goa-link-button");
    expect(footerButtons.length).toBe(2);
    expect(footerButtons[0].textContent).toContain("View all");
    expect(footerButtons[1].textContent).toContain("Mark all as read");

    // Slot content renders
    expect(container.querySelectorAll("goa-work-side-notification-item").length).toBe(2);

    // Empty state shows (items don't mount as real web components in test env)
    expect(container.querySelector(".empty")).toBeTruthy();
    expect(container.querySelector(".subline")?.textContent).toContain("No unread notifications");

    // -- Events --
    const onViewAll = vi.fn();
    const onClose = vi.fn();

    panel?.addEventListener("_viewAll", onViewAll);
    panel?.addEventListener("goa:work-side-notification-panel:closePopover", onClose);

    // View all
    footerButtons[0].dispatchEvent(new CustomEvent("_click", { bubbles: true }));
    await waitFor(() => {
      expect(onViewAll).toHaveBeenCalledTimes(1);
    });

    // Close button
    const closeBtn = container.querySelector("goa-icon-button");
    closeBtn?.dispatchEvent(new CustomEvent("_click", { bubbles: true }));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
