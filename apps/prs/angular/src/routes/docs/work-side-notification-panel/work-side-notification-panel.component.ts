import { Component } from "@angular/core";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
} from "@abgov/angular-components";
import type {
  GoabWorkSideNotificationItemType,
  GoabWorkSideNotificationPriority,
  GoabWorkSideNotificationReadStatus,
} from "@abgov/ui-components-common";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: GoabWorkSideNotificationItemType;
  readStatus: GoabWorkSideNotificationReadStatus;
  priority: GoabWorkSideNotificationPriority;
}

@Component({
  standalone: true,
  selector: "abgov-docs-work-side-notification-panel",
  templateUrl: "./work-side-notification-panel.component.html",
  imports: [
    GoabWorkSideMenu,
    GoabWorkSideMenuItem,
    GoabWorkSideNotificationItem,
    GoabWorkSideNotificationPanel,
  ],
})
export class DocsWorkSideNotificationPanelComponent {
  basicItems: NotificationItem[] = [
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

  urgentItems: NotificationItem[] = [
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

  allTypeItems: NotificationItem[] = [
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

  handleNavigate(path: string): void {
    console.log("navigate", path);
  }

  // --- Basic notification panel handlers ---
  handleMarkAllBasicNotificationsRead(): void {
    this.basicItems = this.basicItems.map((item) => ({ ...item, readStatus: "read" }));
  }

  handleViewAllBasicNotifications(): void {
    console.log("view all basic notifications");
  }

  handleClickBasicNotification(id: string): void {
    this.basicItems = this.basicItems.map((item) =>
      item.id === id ? { ...item, readStatus: "read" } : item,
    );
  }

  // --- Urgent notification panel handlers ---
  handleMarkAllUrgentNotificationsRead(): void {
    this.urgentItems = this.urgentItems.map((item) => ({ ...item, readStatus: "read" }));
  }

  handleViewAllUrgentNotifications(): void {
    console.log("view all urgent notifications");
  }

  handleClickUrgentNotification(id: string): void {
    this.urgentItems = this.urgentItems.map((item) =>
      item.id === id ? { ...item, readStatus: "read" } : item,
    );
  }

  // --- Notification type badges panel handlers ---
  handleMarkAllNotificationTypesRead(): void {
    this.allTypeItems = this.allTypeItems.map((item) => ({ ...item, readStatus: "read" }));
  }

  handleViewAllNotificationTypes(): void {
    console.log("view all notification types");
  }

  handleClickNotificationType(id: string): void {
    this.allTypeItems = this.allTypeItems.map((item) =>
      item.id === id ? { ...item, readStatus: "read" } : item,
    );
  }
}
