import { useState } from "react";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
  type GoabWorkSideNotificationItemProps,
} from "@abgov/react-components";

type NotificationItem = GoabWorkSideNotificationItemProps & { id: string };

const initialBasicItems: NotificationItem[] = [
  {
    id: "1",
    title: "New case assigned",
    description: "Case #12345 has been assigned to you for review.",
    timestamp: "2025-03-15T10:30:00Z",
    type: "info",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "2",
    title: "Document uploaded",
    description: "A new document was uploaded to Case #12340.",
    timestamp: "2025-03-15T09:15:00Z",
    type: "default",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "3",
    title: "Case resolved",
    description: "Case #12330 has been marked as resolved.",
    timestamp: "2025-03-14T16:00:00Z",
    type: "success",
    readStatus: "read",
    priority: "normal",
  },
];

const initialUrgentItems: NotificationItem[] = [
  {
    id: "1",
    title: "System maintenance",
    description: "Scheduled maintenance tonight at 11 PM. All services will be unavailable.",
    timestamp: "2025-03-15T14:00:00Z",
    type: "critical",
    readStatus: "unread",
    priority: "urgent",
  },
  {
    id: "2",
    title: "Deadline approaching",
    description: "Case #12345 response is due in 2 hours.",
    timestamp: "2025-03-15T12:00:00Z",
    type: "warning",
    readStatus: "unread",
    priority: "urgent",
  },
  {
    id: "3",
    title: "New comment on case",
    description: "A team member commented on Case #12340.",
    timestamp: "2025-03-15T11:00:00Z",
    type: "default",
    readStatus: "unread",
    priority: "normal",
  },
];

const initialAllTypeItems: NotificationItem[] = [
  {
    id: "1",
    title: "New comment on case",
    description: "A team member commented on Case #12340.",
    timestamp: "2025-03-15T10:00:00Z",
    type: "default",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "2",
    title: "Case #12345 assigned",
    description: "Case #12345 has been assigned to you for review.",
    timestamp: "2025-03-15T09:00:00Z",
    type: "info",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "3",
    title: "Case resolved",
    description: "Case #12330 has been marked as resolved.",
    timestamp: "2025-03-15T08:00:00Z",
    type: "success",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "4",
    title: "Deadline approaching",
    description: "Case #12345 response is due in 2 hours.",
    timestamp: "2025-03-15T07:00:00Z",
    type: "warning",
    readStatus: "unread",
    priority: "normal",
  },
  {
    id: "5",
    title: "System maintenance",
    description: "Scheduled maintenance tonight at 11 PM. All services will be unavailable.",
    timestamp: "2025-03-15T06:00:00Z",
    type: "critical",
    readStatus: "unread",
    priority: "normal",
  },
];

export function DocsWorkSideNotificationPanelRoute() {
  const [basicItems, setBasicItems] = useState(initialBasicItems);
  const [urgentItems, setUrgentItems] = useState(initialUrgentItems);
  const [allTypeItems, setAllTypeItems] = useState(initialAllTypeItems);

  function navigate(path: string) {
    console.log("navigate", path);
  }

  // --- Basic notification panel handlers ---
  function handleMarkAllBasicNotificationsRead() {
    setBasicItems((items) =>
      items.map((item) => ({ ...item, readStatus: "read" })),
    );
  }

  function handleViewAllBasicNotifications() {
    console.log("view all basic notifications");
  }

  function handleClickBasicNotification(id: string) {
    setBasicItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, readStatus: "read" } : item,
      ),
    );
  }

  // --- Urgent notification panel handlers ---
  function handleMarkAllUrgentNotificationsRead() {
    setUrgentItems((items) =>
      items.map((item) => ({ ...item, readStatus: "read" })),
    );
  }

  function handleViewAllUrgentNotifications() {
    console.log("view all urgent notifications");
  }

  function handleClickUrgentNotification(id: string) {
    setUrgentItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, readStatus: "read" } : item,
      ),
    );
  }

  // --- Notification type badges panel handlers ---
  function handleMarkAllNotificationTypesRead() {
    setAllTypeItems((items) =>
      items.map((item) => ({ ...item, readStatus: "read" })),
    );
  }

  function handleViewAllNotificationTypes() {
    console.log("view all notification types");
  }

  function handleClickNotificationType(id: string) {
    setAllTypeItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, readStatus: "read" } : item,
      ),
    );
  }

  return (
    <div>
      <h2>Notification panel</h2>

      <h3>Basic notification panel</h3>
      <GoabWorkSideMenu
        heading="My Application"
        url="/"
        onNavigate={(path: string) => navigate(path)}
        primaryContent={
          <>
            <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
            <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
          </>
        }
        secondaryContent={
          <GoabWorkSideMenuItem
            icon="notifications"
            label="Notifications"
            badge="2"
            type="success"
            popoverContent={
              <GoabWorkSideNotificationPanel
                heading="Notifications"
                activeTab="unread"
                onMarkAllRead={() => handleMarkAllBasicNotificationsRead()}
                onViewAll={() => handleViewAllBasicNotifications()}
              >
                {basicItems.map(({ id, ...item }) => (
                  <GoabWorkSideNotificationItem
                    key={id}
                    {...item}
                    onClick={() => handleClickBasicNotification(id)}
                  />
                ))}
              </GoabWorkSideNotificationPanel>
            }
          />
        }
      />

      <h3>With urgent notifications</h3>
      <GoabWorkSideMenu
        heading="My Application"
        url="/"
        onNavigate={(path: string) => navigate(path)}
        primaryContent={
          <>
            <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
            <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
          </>
        }
        secondaryContent={
          <GoabWorkSideMenuItem
            icon="notifications"
            label="Notifications"
            badge="2"
            type="emergency"
            popoverContent={
              <GoabWorkSideNotificationPanel
                heading="Notifications"
                activeTab="urgent"
                onMarkAllRead={() => handleMarkAllUrgentNotificationsRead()}
                onViewAll={() => handleViewAllUrgentNotifications()}
              >
                {urgentItems.map(({ id, ...item }) => (
                  <GoabWorkSideNotificationItem
                    key={id}
                    {...item}
                    onClick={() => handleClickUrgentNotification(id)}
                  />
                ))}
              </GoabWorkSideNotificationPanel>
            }
          />
        }
      />

      <h3>Notification type badges</h3>
      <GoabWorkSideMenu
        heading="My Application"
        url="/"
        onNavigate={(path: string) => navigate(path)}
        primaryContent={
          <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
        }
        secondaryContent={
          <GoabWorkSideMenuItem
            icon="notifications"
            label="Notifications"
            badge="5"
            type="success"
            popoverContent={
              <GoabWorkSideNotificationPanel
                heading="Notifications"
                activeTab="all"
                onMarkAllRead={() => handleMarkAllNotificationTypesRead()}
                onViewAll={() => handleViewAllNotificationTypes()}
              >
                {allTypeItems.map(({ id, ...item }) => (
                  <GoabWorkSideNotificationItem
                    key={id}
                    {...item}
                    onClick={() => handleClickNotificationType(id)}
                  />
                ))}
              </GoabWorkSideNotificationPanel>
            }
          />
        }
      />
    </div>
  );
}
