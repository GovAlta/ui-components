import { useState } from "react";
import { render } from "vitest-browser-react";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideNotificationPanel,
  GoabxWorkSideNotificationItem,
} from "../src/experimental";
import { expect, describe, it, vi } from "vitest";
import { page } from "@vitest/browser/context";

type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "critical";
  readStatus: "read" | "unread";
  priority: "normal" | "urgent";
};

function createNotifications(): Notification[] {
  const now = Date.now();
  return [
    {
      id: "1",
      title: "New case assigned",
      description: "Case #12345 has been assigned to you for review.",
      timestamp: new Date(now - 5 * 60 * 1000).toISOString(),
      type: "info",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "2",
      title: "Document uploaded",
      description: "A new document was uploaded to Case #12340.",
      timestamp: new Date(now - 30 * 60 * 1000).toISOString(),
      type: "success",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "3",
      title: "System maintenance",
      description: "Scheduled maintenance tonight at 11 PM MST.",
      timestamp: new Date(now - 60 * 60 * 1000).toISOString(),
      type: "critical",
      readStatus: "unread",
      priority: "urgent",
    },
    {
      id: "4",
      title: "Action required",
      description: "Please review the pending approval request.",
      timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
      type: "warning",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "5",
      title: "Deadline approaching",
      description: "Case #12300 deadline is in 24 hours.",
      timestamp: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
      type: "warning",
      readStatus: "unread",
      priority: "urgent",
    },
    {
      id: "6",
      title: "Comment added",
      description: "John Smith commented on Case #12342.",
      timestamp: new Date(now - 8 * 60 * 60 * 1000).toISOString(),
      type: "info",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "7",
      title: "Case status updated",
      description: "Case #12339 status changed to In Review.",
      timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: "success",
      readStatus: "read",
      priority: "normal",
    },
    {
      id: "8",
      title: "New attachment",
      description: "PDF document attached to Case #12338.",
      timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: "info",
      readStatus: "read",
      priority: "normal",
    },
  ];
}

function NotificationMenuComponent({
  onMarkAllRead,
  onViewAll,
  onItemClick,
}: {
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
  onItemClick?: () => void;
}) {
  const [notifications, setNotifications] = useState(createNotifications());

  const handleItemClick = (id: string) => {
    onItemClick?.();
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id && n.readStatus === "unread"
          ? { ...n, readStatus: "read" as const }
          : n,
      ),
    );
  };

  const handleMarkAllRead = () => {
    onMarkAllRead?.();
    setNotifications((prev) => prev.map((n) => ({ ...n, readStatus: "read" as const })));
  };

  return (
    <GoabxWorkSideMenu
      heading="Test Heading"
      url="https://example.com/"
      userName="John Doe"
      userSecondaryText="test@example.com"
      testId="work-space-side-menu"
      primaryContent={<GoabxWorkSideMenuItem url="#item1" label="Item 1" />}
      secondaryContent={
        <GoabxWorkSideMenuItem
          icon="notifications"
          label="Notifications"
          url="#"
          testId="work-space-side-menu-item-notification"
          popoverContent={
            <GoabxWorkSideNotificationPanel
              heading="Notifications"
              activeTab="unread"
              testId="work-space-side-notification-panel"
              onMarkAllRead={handleMarkAllRead}
              onViewAll={onViewAll}
            >
              {notifications.map((notif) => (
                <GoabxWorkSideNotificationItem
                  key={notif.id}
                  testId={`noti-${notif.id}`}
                  title={notif.title}
                  description={notif.description}
                  readStatus={notif.readStatus}
                  priority={notif.priority}
                  type={notif.type}
                  timestamp={notif.timestamp}
                  onClick={() => handleItemClick(notif.id)}
                />
              ))}
            </GoabxWorkSideNotificationPanel>
          }
        />
      }
      accountContent={<GoabxWorkSideMenuItem url="#settings" label="Settings" />}
      open={true}
    />
  );
}

describe("WorkSideMenu with Popover", () => {
  describe("Mobile viewport", () => {
    it("should open notification panel in a bottom drawer", async () => {
      // iPhone 14 viewport (390x844)
      await page.viewport(390, 844);

      const onMarkAllRead = vi.fn();
      const onViewAll = vi.fn();
      const onItemClick = vi.fn();

      const result = render(
        <NotificationMenuComponent
          onMarkAllRead={onMarkAllRead}
          onViewAll={onViewAll}
          onItemClick={onItemClick}
        />,
      );

      // Menu should be visible initially
      const menu = result.getByTestId("work-space-side-menu");
      expect(menu).toBeTruthy();

      // Click the notification menu item to open the drawer
      const notifMenuItem = result.getByTestId("work-space-side-menu-item-notification");
      await notifMenuItem.click();

      // A goa-drawer should be appended to document.body with position="bottom"
      await vi.waitFor(() => {
        const drawer = document.body.querySelector("goa-drawer");
        expect(drawer).toBeTruthy();
        expect(drawer?.getAttribute("position")).toBe("bottom");
        expect(drawer?.hasAttribute("open")).toBe(true);
      });

      // Menu should be hidden when drawer is open
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("drawer-open")).toBe(true);
      });

      // Notification panel content should be inside the drawer
      await vi.waitFor(() => {
        const drawer = document.body.querySelector("goa-drawer");
        const panel = drawer?.querySelector("goa-work-side-notification-panel");
        expect(panel).toBeTruthy();
      });

      // Notification items should be rendered inside the drawer
      await vi.waitFor(() => {
        const drawer = document.body.querySelector("goa-drawer");
        const items = drawer?.querySelectorAll("goa-work-side-notification-item");
        expect(items?.length).toBe(8);
      });

      // Click the close button inside the notification panel to close the drawer
      const closeBtn = result.getByTestId("close-work-space-side-notification-panel");
      await closeBtn.click();

      // Drawer should close
      await vi.waitFor(() => {
        const drawer = document.body.querySelector("goa-drawer");
        expect(drawer?.getAttribute("open")).toBeNull();
      });

      // Menu should be visible again
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("drawer-open")).toBe(false);
      });
    });
  });

  describe("Desktop viewport", () => {
    it("should open notification panel in a popover", async () => {
      await page.viewport(1024, 768);

      const onMarkAllRead = vi.fn();
      const onViewAll = vi.fn();
      const onItemClick = vi.fn();

      const result = render(
        <NotificationMenuComponent
          onMarkAllRead={onMarkAllRead}
          onViewAll={onViewAll}
          onItemClick={onItemClick}
        />,
      );

      // Click the notification menu item to open the popover
      const notifMenuItem = result.getByTestId("work-space-side-menu-item-notification");
      await notifMenuItem.click();

      // Panel should be visible inside popover
      await vi.waitFor(() => {
        const panel = result.getByTestId("work-space-side-notification-panel");
        expect(panel).toBeTruthy();

        const panelEl = panel.element();

        // Heading shows "Notifications"
        expect(panelEl.textContent).toContain("Notifications");

        // "Unread" tab is selected (tab-1 with aria-selected="true")
        const unreadTab = result.getByTestId("tab-1");
        expect(unreadTab).toBeTruthy();
        expect(unreadTab.element().getAttribute("aria-selected")).toBe("true");
      });

      // Verify notification items are rendered but some of them will be hidden by status
      await vi.waitFor(() => {
        const items = result.baseElement.querySelectorAll(
          "goa-work-side-notification-item",
        );
        expect(items.length).toBe(8);
      });

      // First notification item should have "Today" date header
      await vi.waitFor(() => {
        const card = result.getByTestId("noti-1").element();
        const shadowRoot = card.getRootNode() as ShadowRoot;
        const dateHeader = shadowRoot.querySelector(".date-header");
        expect(dateHeader?.textContent).toBe("Today");
      });

      // First notification item has unread dot and timestamp
      await vi.waitFor(() => {
        const unreadDot = result.getByTestId("unread-dot-noti-1");
        expect(unreadDot).toBeTruthy();

        const timestamp = result.getByTestId("timestamp-noti-1");
        expect(timestamp).toBeTruthy();
        expect(timestamp.element().textContent).toMatch(/\d+ min ago/);
      });

      // Unread count badge shows 6 (wait for items to mount and register)
      await vi.waitFor(() => {
        const unreadBadge = result.getByTestId("unreadCount");
        expect(unreadBadge).toBeTruthy();
        expect(unreadBadge.element().textContent).toContain("6");
      });

      // Click the first notification item
      const firstCard = result.getByTestId("noti-1");
      await firstCard.click();

      // After clicking, the card should have "read" and "hidden" classes
      await vi.waitFor(() => {
        const card = result.getByTestId("noti-1").element();
        expect(card.classList.contains("read")).toBe(true);
        expect(card.classList.contains("hidden")).toBe(true);
      });

      // Click "Mark all as read" button
      const markAllBtn = result.getByTestId(
        "mark-all-as-read-work-space-side-notification-panel",
      );
      await markAllBtn.click();

      // Panel should show empty state: "No unread notifications"
      await vi.waitFor(() => {
        const subline = result.getByTestId(
          "empty-notifications-work-space-side-notification-panel",
        );
        expect(subline.element().textContent).toBe("No unread notifications");
      });

      // "Mark all as read" button should be disabled
      await vi.waitFor(() => {
        const markAllBtnEl = result
          .getByTestId("mark-all-as-read-work-space-side-notification-panel")
          .element();
        expect(markAllBtnEl.hasAttribute("disabled")).toBe(true);
      });

      // Click on "Urgent" tab
      const urgentTab = result.getByTestId("tab-2");
      await urgentTab.click();

      // Expect 2 urgent items visible with classes "urgent" and "read" but not "hidden"
      await vi.waitFor(() => {
        const noti3 = result.getByTestId("noti-3").element();
        expect(noti3.classList.contains("urgent")).toBe(true);
        expect(noti3.classList.contains("read")).toBe(true);
        expect(noti3.classList.contains("hidden")).toBe(false);

        const noti5 = result.getByTestId("noti-5").element();
        expect(noti5.classList.contains("urgent")).toBe(true);
        expect(noti5.classList.contains("read")).toBe(true);
        expect(noti5.classList.contains("hidden")).toBe(false);
      });

      // Click on "All" tab
      const allTab = result.getByTestId("tab-3");
      await allTab.click();

      // All 8 notification items should have class "read" and not "hidden"
      await vi.waitFor(() => {
        for (let i = 1; i <= 8; i++) {
          const card = result.getByTestId(`noti-${i}`).element();
          expect(card.classList.contains("read")).toBe(true);
          expect(card.classList.contains("hidden")).toBe(false);
        }
      });
    });
  });
});
