import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabPushDrawer,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
  useTheme,
  GoabWorkspaceLayout,
  useGoabWorkspaceLayoutScrollState,
} from "@abgov/react-components";
import { GoabWorkspaceLayoutScrollState } from "@abgov/ui-components-common";
import {
  bugRouteDefinitions,
  docsRouteDefinitions,
  featureRouteDefinitions,
} from "./route-manifest";
import "@abgov/style";
// Runtime V1/V2 token switching. Importing this module applies the currently
// selected token set (default V2) to <head> before the app renders. The
// playground's work-side-menu exposes a secondary item that flips between
// V1 and V2 at runtime without editing source or restarting the dev server.
import {
  applyTokenVersion,
  resolveTokenVersion,
  type TokenVersion,
} from "./tokenVersion";

const PUSH_DRAWER_ROUTE_PATH = "/features/3347-push";
const pushDrawerTestParagraphs = Array.from({ length: 30 }, (_, i) => i + 1);

interface NotificationData {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "critical";
  readStatus: "read" | "unread";
  priority: "normal" | "urgent";
}

function createSampleNotifications(): NotificationData[] {
  const now = Date.now();
  const minutesAgo = (mins: number) => new Date(now - mins * 60 * 1000).toISOString();
  return [
    {
      id: "1",
      title: "New case assigned",
      description: "Case #12345 has been assigned to you for review.",
      timestamp: minutesAgo(5),
      type: "info",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "2",
      title: "Document uploaded",
      description: "A new document was uploaded to Case #12340.",
      timestamp: minutesAgo(30),
      type: "success",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "3",
      title: "System maintenance",
      description: "Scheduled maintenance tonight at 11 PM MST.",
      timestamp: minutesAgo(60),
      type: "critical",
      readStatus: "unread",
      priority: "urgent",
    },
    {
      id: "4",
      title: "Deadline approaching",
      description: "Case #12300 deadline is in 24 hours.",
      timestamp: minutesAgo(60 * 26),
      type: "warning",
      readStatus: "read",
      priority: "urgent",
    },
  ];
}

/** Outlet context shape exposed to routes rendered inside App. */
export interface AppOutletContext {
  openPushDrawer: () => void;
}

// Sentinel URL handled by onNavigate below to toggle tokens instead of routing.
const TOKEN_TOGGLE_URL = "#tokens";

// Demo: a slotted page-header that shrinks its heading once content scrolls
// under the pinned header. It reads the layout's scroll state via the context
// hook (no prop drilling), using the same middle / at-bottom states that drive
// the scroll cue. The heading size swaps discretely between states. Because it
// reads context, it must be its own component rendered inside the layout, not
// inline JSX created up in App.
function PlaygroundPageHeader() {
  const { scrollPosition } = useGoabWorkspaceLayoutScrollState();
  const pinned =
    scrollPosition === GoabWorkspaceLayoutScrollState.MIDDLE ||
    scrollPosition === GoabWorkspaceLayoutScrollState.AT_BOTTOM;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--goa-space-m)",
        width: "100%",
      }}
    >
      <GoabText tag="h1" size={pinned ? "heading-s" : "heading-m"} mt="none" mb="none">
        Testing Playground
      </GoabText>
      <GoabButtonGroup alignment="end" gap={pinned ? "compact" : "relaxed"}>
        <GoabButton type="secondary" size={pinned ? "compact" : "normal"}>
          Secondary
        </GoabButton>
        <GoabButton type="primary" size={pinned ? "compact" : "normal"}>
          Primary action
        </GoabButton>
      </GoabButtonGroup>
    </div>
  );
}

export function App() {
  const navigate = useNavigate();
  const { mode, toggle } = useTheme();
  const isDark = mode === "dark";
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL;
  const [tokenMode, setTokenMode] = useState<TokenVersion>(() => resolveTokenVersion());

  const isPushDrawerRoute =
    location.pathname === PUSH_DRAWER_ROUTE_PATH ||
    location.pathname === `${baseUrl}features/3347-push`;
  const [pushDrawerOpen, setPushDrawerOpen] = useState(isPushDrawerRoute);

  // Re-open the drawer each time the user navigates back to the test route so
  // closing it once doesn't make the rest of the page useless for the demo.
  useEffect(() => {
    if (isPushDrawerRoute) setPushDrawerOpen(true);
  }, [isPushDrawerRoute]);

  const closePushDrawer = () => setPushDrawerOpen(false);
  const pushDrawerActions = (
    <GoabButtonGroup alignment="start">
      <GoabButton type="primary" size="compact" onClick={closePushDrawer}>
        Save
      </GoabButton>
      <GoabButton type="secondary" size="compact" onClick={closePushDrawer}>
        Cancel
      </GoabButton>
    </GoabButtonGroup>
  );

  const handleSideMenuNavigate = (path: string) => {
    if (path === TOKEN_TOGGLE_URL) {
      const next: TokenVersion = tokenMode === "v1" ? "v2" : "v1";
      setTokenMode(next);
      applyTokenVersion(next);
      return;
    }
    if (path === "#toggle-theme") {
      toggle();
      return;
    }
    const internal = path.startsWith(baseUrl) ? "/" + path.slice(baseUrl.length) : path;
    navigate(internal);
  };

  // Sample notifications to populate the position-right panel for #4110.
  const [notifications, setNotifications] = useState<NotificationData[]>(() =>
    createSampleNotifications(),
  );

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id && notif.readStatus === "unread"
          ? { ...notif, readStatus: "read" as const }
          : notif,
      ),
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, readStatus: "read" as const })),
    );
  };

  const handleViewAll = () => {
    console.log("View all notifications");
  };

  const sideMenu = (
    <GoabWorkSideMenu
      heading="Testing Playground"
      url={baseUrl}
      open={true}
      userName="Edna Mode"
      userSecondaryText="edna.mode@gov.ab.ca"
      onNavigate={handleSideMenuNavigate}
      secondaryContent={
        <>
          <GoabWorkSideMenuItem
            label={`Switch to ${tokenMode === "v1" ? "V2" : "V1"} tokens`}
            icon="swap-horizontal"
            url={TOKEN_TOGGLE_URL}
          />
          <GoabWorkSideMenuItem
            icon={isDark ? "sunny" : "moon"}
            label={isDark ? "Light mode" : "Dark mode"}
            url="#toggle-theme"
          />
          <GoabWorkSideMenuItem
            icon="notifications"
            label="Notifications"
            url="#"
            trailingContent={
              <GoabBadge type="success" content={`${notifications.length}`} />
            }
            testId="work-space-side-menu-item-notification"
            popoverContent={
              <GoabWorkSideNotificationPanel
                testId="work-space-side-notification-panel"
                heading="Notifications"
                activeTab="unread"
                onMarkAllRead={handleMarkAllRead}
                onViewAll={handleViewAll}
              >
                {notifications.map((notif) => (
                  <GoabWorkSideNotificationItem
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
              </GoabWorkSideNotificationPanel>
            }
          />
        </>
      }
      accountContent={
        <>
          <GoabWorkSideMenuItem icon="settings" label="Settings" url="#" />
          <GoabWorkSideMenuItem icon="log-out" label="Log out" url="#" />
        </>
      }
      primaryContent={
        <>
          <GoabWorkSideMenuGroup icon="alert-circle" heading="Bugs">
            {bugRouteDefinitions.map((route) => (
              <GoabWorkSideMenuItem
                key={route.path}
                label={route.id + " - " + route.title}
                url={`${baseUrl}${route.path}`}
              />
            ))}
          </GoabWorkSideMenuGroup>

          <GoabWorkSideMenuGroup icon="star" heading="Features">
            {featureRouteDefinitions.map((route) => (
              <GoabWorkSideMenuItem
                key={route.path}
                label={route.id + " - " + route.title}
                url={`${baseUrl}${route.path}`}
              />
            ))}
          </GoabWorkSideMenuGroup>
          <GoabWorkSideMenuGroup icon="book" heading="Docs">
            {docsRouteDefinitions.map((route) => (
              <GoabWorkSideMenuItem
                key={route.path}
                label={route.title}
                url={`${baseUrl}${route.path}`}
              />
            ))}
          </GoabWorkSideMenuGroup>
          <GoabWorkSideMenuItem
            icon="list"
            label="Everything"
            url={`${baseUrl}everything`}
          />
        </>
      }
    />
  );

  // Sticky page-header slot. This slot is for contextual page-level content
  // (page heading, action bars), not the app chrome. See PlaygroundPageHeader,
  // which also demos shrinking the heading on scroll via the scroll-state hook.
  const pageHeader = <PlaygroundPageHeader />;
  // Sticky page-footer slot. Like the header, this is for contextual content
  // (e.g. a bulk-action bar that appears when rows are selected), not the app
  // footer. GoabAppFooter (with the GoA logo) was the wrong mental model here.
  const pageFooter = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--goa-space-m)",
        width: "100%",
      }}
    >
      <GoabText size="body-m" mt="none" mb="none">
        3 rows selected
      </GoabText>
      <GoabButtonGroup alignment="end" gap="compact">
        <GoabButton type="secondary" size="compact">
          Clear selection
        </GoabButton>
        <GoabButton type="primary" size="compact">
          Export selected
        </GoabButton>
      </GoabButtonGroup>
    </div>
  );

  const pushDrawer =
    isPushDrawerRoute || pushDrawerOpen ? (
      <GoabPushDrawer
        testId="push-drawer-v2"
        heading="Push Drawer V2 test"
        open={pushDrawerOpen}
        width="492px"
        actions={pushDrawerActions}
        onClose={closePushDrawer}
      >
        {pushDrawerTestParagraphs.map((n) => (
          <p key={n}>
            Paragraph {n} — Push Drawer V2 now uses goa-scroll-panel internally. Verify
            header sticky + actions sticky + content scrolls + outer chrome morphs
            (margins/radius/height) as scroll state changes between top / middle / bottom.
          </p>
        ))}
      </GoabPushDrawer>
    ) : undefined;

  return (
    <GoabWorkspaceLayout
      sideMenu={sideMenu}
      pageHeader={pageHeader}
      pageFooter={pageFooter}
      pushDrawer={pushDrawer}
    >
      <div style={{ padding: "30px" }}>
        <Outlet
          context={
            {
              openPushDrawer: () => setPushDrawerOpen(true),
            } satisfies AppOutletContext
          }
        />
      </div>
    </GoabWorkspaceLayout>
  );
}

export default App;
