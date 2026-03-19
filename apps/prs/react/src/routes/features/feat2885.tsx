import { useState, useEffect } from "react";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideNotificationPanel,
  GoabxWorkSideNotificationItem,
} from "@abgov/react-components/experimental";
import { GoabIconButton } from "@abgov/react-components";
// ?url suffix tells Vite to resolve the path without injecting the CSS
import v2TokensUrl from "@abgov/design-tokens-v2/dist/tokens.css?url";

type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "critical";
  readStatus: "read" | "unread";
  priority: "normal" | "urgent";
};

export function Feat2885Route() {
  const [menuOpen, setMenuOpen] = useState(true);

  // Dynamically load v2 design tokens only while this page is mounted,
  // so they don't leak into other routes in the SPA.
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = v2TokensUrl;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Helper to get date at specific days ago
  const daysAgo = (days: number, hours = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(date.getHours() - hours);
    return date.toISOString();
  };

  // Sample notification data - with different dates to test date headers
  const [notifications, setNotifications] = useState<Notification[]>([
    // Today (newest first)
    {
      id: "1",
      title: "New case assigned",
      description: "Case #12345 has been assigned to you for review.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
      type: "info",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "2",
      title: "Document uploaded",
      description: "A new document was uploaded to Case #12340.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
      type: "success",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "3",
      title: "System maintenance",
      description: "Scheduled maintenance tonight at 11 PM MST.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 h ago
      type: "critical",
      readStatus: "unread",
      priority: "urgent",
    },
    // Yesterday
    {
      id: "4",
      title: "Action required",
      description: "Please review the pending approval request.",
      timestamp: daysAgo(1, 2), // Yesterday, 2 hours ago
      type: "warning",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "5",
      title: "Deadline approaching",
      description: "Case #12300 deadline is in 24 hours.",
      timestamp: daysAgo(1, 5), // Yesterday, 5 hours ago
      type: "warning",
      readStatus: "unread",
      priority: "urgent",
    },
    {
      id: "6",
      title: "Comment added",
      description: "John Smith commented on Case #12342.",
      timestamp: daysAgo(1, 8), // Yesterday, 8 hours ago
      type: "info",
      readStatus: "unread",
      priority: "normal",
    },
    // 3 days ago
    {
      id: "7",
      title: "Case status updated",
      description: "Case #12339 status changed to 'In Review'.",
      timestamp: daysAgo(3, 2), // 3 days ago
      type: "success",
      readStatus: "read",
      priority: "normal",
    },
    {
      id: "8",
      title: "New attachment",
      description: "PDF document attached to Case #12338.",
      timestamp: daysAgo(3, 6), // 3 days ago
      type: "info",
      readStatus: "read",
      priority: "normal",
    },
    // 7 days ago
    {
      id: "9",
      title: "Weekly report generated",
      description: "Your weekly summary report is ready.",
      timestamp: daysAgo(7, 0), // 7 days ago
      type: "info",
      readStatus: "read",
      priority: "normal",
    },
    // 14 days ago
    {
      id: "10",
      title: "Password reminder",
      description: "Your password will expire in 30 days.",
      timestamp: daysAgo(14, 0), // 14 days ago
      type: "warning",
      readStatus: "read",
      priority: "normal",
    },
  ]);

  const handleNotificationClick = (id: string) => {
    console.log("Notification clicked:", id);
    // Mark as read when clicking an unread notification
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id && notif.readStatus === "unread"
          ? { ...notif, readStatus: "read" as const }
          : notif,
      ),
    );
  };

  const handleMarkAllRead = () => {
    console.log("Mark all as read clicked");
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, readStatus: "read" as const })),
    );
  };

  const handleViewAll = () => {
    console.log("View all clicked");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <GoabxWorkSideMenu
        heading="Workspace Demo"
        url="/"
        testId="work-space-side-menu"
        userName="John Doe"
        userSecondaryText="john.doe@gov.ab.ca"
        open={menuOpen}
        onToggle={() => setMenuOpen((prev) => !prev)}
        primaryContent={
          <>
            <GoabxWorkSideMenuItem icon="grid" label="Dashboard" url="/features/2885" />
            <GoabxWorkSideMenuItem
              icon="search"
              label="Search"
              url="/features/2885/search"
            />
            <GoabxWorkSideMenuItem
              icon="list"
              label="Cases"
              url="/features/2885/cases"
              badge="5"
              type="success"
            />
            <GoabxWorkSideMenuItem
              icon="document"
              label="Documents"
              url="/features/2885/documents"
              divider={true}
            />
            <GoabxWorkSideMenuItem
              icon="alert-circle"
              label="Alerts"
              url="#"
              badge="3"
              type="emergency"
              testId="work-space-side-menu-item-alert"
              popoverContent={
                <div style={{ padding: "1rem", width: "280px" }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>
                    Custom Popover Content
                  </h3>
                  <p
                    style={{ margin: "0 0 1rem 0", color: "#666", fontSize: "0.875rem" }}
                  >
                    This demonstrates that <code>popoverContent</code> accepts any React
                    node, not just <code>GoabxWorkSideNotificationPanel</code>.
                  </p>
                  <ul
                    style={{ margin: "0", paddingLeft: "1.25rem", fontSize: "0.875rem" }}
                  >
                    <li>Custom alerts</li>
                    <li>Quick actions</li>
                    <li>Mini dashboards</li>
                    <li>Any custom UI</li>
                  </ul>
                </div>
              }
            />
          </>
        }
        secondaryContent={
          <>
            <GoabxWorkSideMenuItem
              icon="notifications"
              label="Notifications"
              url="#"
              badge="12"
              type="success"
              testId="work-space-side-menu-item-notification"
              popoverContent={
                <GoabxWorkSideNotificationPanel
                  testId="work-space-side-notification-panel"
                  heading="Notifications"
                  activeTab="unread"
                  onMarkAllRead={handleMarkAllRead}
                  onViewAll={handleViewAll}
                >
                  {/* Single slot - items are auto-filtered by readStatus/priority */}
                  {notifications.map((notif) => (
                    <GoabxWorkSideNotificationItem
                      key={notif.id}
                      testId={`noti-${notif.id}`}
                      title={notif.title}
                      description={notif.description}
                      timestamp={notif.timestamp}
                      type={notif.type}
                      readStatus={notif.readStatus}
                      priority={notif.priority}
                      onClick={() => handleNotificationClick(notif.id)}
                    />
                  ))}
                </GoabxWorkSideNotificationPanel>
              }
            />
            <GoabxWorkSideMenuItem
              icon="help-circle"
              label="Help"
              url="/features/2885/help"
            />
          </>
        }
        accountContent={
          <>
            <GoabxWorkSideMenuItem
              icon="settings"
              label="Settings"
              url="/features/2885/settings"
            />
            <GoabxWorkSideMenuItem icon="log-out" label="Log out" url="/logout" />
          </>
        }
      />

      <main
        style={{
          flex: 1,
          padding: "2rem",
          backgroundColor: "#f3f3f3",
          overflow: "auto",
        }}
      >
        {/* Mobile menu toggle button */}
        <div className="mobile-menu-toggle">
          <GoabIconButton icon="menu" variant="dark" onClick={() => setMenuOpen(true)} />
        </div>
        <style>{`
          .mobile-menu-toggle {
            display: none;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 100;
          }
          @media (max-width: 624px) {
            .mobile-menu-toggle {
              display: block;
            }
          }
        `}</style>

        <h1>Feature #2885: Work Side Menu with Notification Popover</h1>
        <p>
          This demonstrates the <code>GoabxWorkSideMenu</code> with the new notification
          popover feature.
        </p>

        <h2>New Features</h2>
        <ul>
          <li>
            <strong>Notification Popover</strong> - Click the "Notifications" menu item to
            see the popover panel
          </li>
          <li>
            <strong>Custom Popover Content</strong> - Click the "Alerts" menu item to see
            a custom div, demonstrating that <code>popoverContent</code> accepts any React
            node
          </li>
          <li>
            <strong>GoabxWorkSideNotificationPanel</strong> - Panel with tabs (Unread,
            Urgent, All)
          </li>
          <li>
            <strong>GoabxWorkSideNotificationItem</strong> - Individual notification cards
            with:
            <ul>
              <li>Title and description</li>
              <li>Smart timestamp formatting (e.g., "5 min ago", "2 h ago")</li>
              <li>Type badges (info, success, warning, critical)</li>
              <li>Read/unread status indicator (green dot)</li>
              <li>Urgent priority styling</li>
            </ul>
          </li>
          <li>
            <strong>Footer actions</strong> - "View all" and "Mark all as read" buttons
          </li>
        </ul>

        <h2>Existing Features</h2>
        <ul>
          <li>
            <strong>Collapsible menu</strong> - Click the toggle button at the bottom to
            expand/collapse
          </li>
          <li>
            <strong>Primary content slot</strong> - Main navigation items
          </li>
          <li>
            <strong>Secondary content slot</strong> - Additional navigation
            (notifications, help)
          </li>
          <li>
            <strong>Account content slot</strong> - User account menu (click profile to
            show)
          </li>
          <li>
            <strong>Badges</strong> - Notification counts with different types (success,
            emergency)
          </li>
          <li>
            <strong>Dividers</strong> - Visual separation between menu groups
          </li>
          <li>
            <strong>Icons</strong> - Each menu item can have an icon
          </li>
          <li>
            <strong>Keyboard navigation</strong> - Arrow keys, Escape, Ctrl+[
          </li>
          <li>
            <strong>Tooltips</strong> - Shown when menu is collapsed
          </li>
        </ul>

        <h2>Menu State</h2>
        <p>
          Menu is currently: <strong>{menuOpen ? "Open" : "Closed"}</strong>
        </p>
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          Toggle Menu Programmatically
        </button>

        <h2>Console Output</h2>
        <p>
          Open the browser console to see events when clicking notifications or footer
          actions.
        </p>
      </main>
    </div>
  );
}
