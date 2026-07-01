import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabDrawer,
  GoabIconButton,
  GoabModal,
  GoabScrollPanel,
  GoabText,
  GoabTooltip,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
} from "@abgov/angular-components";

type NotificationData = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "critical";
  readStatus: "read" | "unread";
  priority: "normal" | "urgent";
};

@Component({
  standalone: true,
  selector: "abgov-feat3347",
  templateUrl: "./feat3347.component.html",
  styleUrls: ["./feat3347.component.css"],
  imports: [
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabDivider,
    GoabDrawer,
    GoabIconButton,
    GoabModal,
    GoabScrollPanel,
    GoabText,
    GoabTooltip,
    GoabWorkSideNotificationItem,
    GoabWorkSideNotificationPanel,
  ],
})
export class Feat3347Component {
  paragraphs = Array.from({ length: 25 }, (_, i) => i + 1);
  selectedCount = 0;
  drawerOpen = false;
  modalOpen = false;

  toggleSelection() {
    this.selectedCount = this.selectedCount > 0 ? 0 : 3;
  }

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  // Notification panel test data — enough items to trigger scroll inside the
  // panel's 710px height so the scroll-panel sticky borders can be verified.
  notifications: NotificationData[] = [
    {
      id: "1",
      title: "New case assigned",
      description: "Case #12345 has been assigned to you for review.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      type: "info",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "2",
      title: "Document uploaded",
      description: "A new document was uploaded to Case #12340.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: "success",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "3",
      title: "System maintenance",
      description: "Scheduled maintenance tonight at 11 PM MST.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      type: "critical",
      readStatus: "unread",
      priority: "urgent",
    },
    {
      id: "4",
      title: "Action required",
      description: "Please review the pending approval request.",
      timestamp: this.daysAgo(1, 2),
      type: "warning",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "5",
      title: "Deadline approaching",
      description: "Case #12300 deadline is in 24 hours.",
      timestamp: this.daysAgo(1, 5),
      type: "warning",
      readStatus: "unread",
      priority: "urgent",
    },
    {
      id: "6",
      title: "Comment added",
      description: "John Smith commented on Case #12342.",
      timestamp: this.daysAgo(1, 8),
      type: "info",
      readStatus: "unread",
      priority: "normal",
    },
    {
      id: "7",
      title: "Case status updated",
      description: "Case #12339 status changed to 'In Review'.",
      timestamp: this.daysAgo(3, 2),
      type: "success",
      readStatus: "read",
      priority: "normal",
    },
    {
      id: "8",
      title: "New attachment",
      description: "PDF document attached to Case #12338.",
      timestamp: this.daysAgo(3, 6),
      type: "info",
      readStatus: "read",
      priority: "normal",
    },
    {
      id: "9",
      title: "Weekly report generated",
      description: "Your weekly summary report is ready.",
      timestamp: this.daysAgo(7, 0),
      type: "info",
      readStatus: "read",
      priority: "normal",
    },
    {
      id: "10",
      title: "Password reminder",
      description: "Your password will expire in 30 days.",
      timestamp: this.daysAgo(14, 0),
      type: "warning",
      readStatus: "read",
      priority: "normal",
    },
  ];

  trackById(_index: number, item: NotificationData): string {
    return item.id;
  }

  daysAgo(days: number, hours = 0): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(date.getHours() - hours);
    return date.toISOString();
  }

  handleNotificationClick(id: string) {
    this.notifications = this.notifications.map((notif) =>
      notif.id === id && notif.readStatus === "unread"
        ? { ...notif, readStatus: "read" as const }
        : notif,
    );
  }

  handleMarkAllRead() {
    this.notifications = this.notifications.map((notif) => ({
      ...notif,
      readStatus: "read" as const,
    }));
  }

  handleViewAll() {
    console.log("View all notifications");
  }
}
