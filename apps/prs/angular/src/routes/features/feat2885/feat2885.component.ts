import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabIconButton,
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideNotificationPanel,
  GoabxWorkSideNotificationItem,
} from "@abgov/angular-components";

type Notification = {
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
  selector: "abgov-feat2885",
  templateUrl: "./feat2885.component.html",
  styles: [
    `
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
    `,
  ],
  imports: [
    CommonModule,
    GoabxWorkSideMenu,
    GoabxWorkSideMenuItem,
    GoabxWorkSideNotificationPanel,
    GoabxWorkSideNotificationItem,
    GoabIconButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Feat2885Component implements OnInit, OnDestroy {
  menuOpen = true;
  private v2TokensLink: HTMLLinkElement | null = null;

  ngOnInit() {
    // Dynamically load v2 design tokens only while this page is mounted,
    // so they don't leak into other routes in the SPA.
    this.v2TokensLink = document.createElement("link");
    this.v2TokensLink.rel = "stylesheet";
    this.v2TokensLink.href = "/v2-tokens/tokens.css";
    document.head.appendChild(this.v2TokensLink);
  }

  ngOnDestroy() {
    if (this.v2TokensLink) {
      document.head.removeChild(this.v2TokensLink);
      this.v2TokensLink = null;
    }
  }

  notifications: Notification[] = [
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
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
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

  daysAgo(days: number, hours = 0): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(date.getHours() - hours);
    return date.toISOString();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openMenu() {
    this.menuOpen = true;
  }

  handleNotificationClick(id: string) {
    console.log("Notification clicked:", id);
    this.notifications = this.notifications.map((notif) =>
      notif.id === id && notif.readStatus === "unread"
        ? { ...notif, readStatus: "read" as const }
        : notif,
    );
  }

  handleMarkAllRead() {
    console.log("Mark all as read clicked");
    this.notifications = this.notifications.map((notif) => ({
      ...notif,
      readStatus: "read" as const,
    }));
  }

  handleViewAll() {
    console.log("View all clicked");
  }
  // This is very important in Angular, to make the mounted and updated the read status on GoabxWorkSideNotificationItem correctly
  trackById(_index: number, notif: Notification): string {
    return notif.id;
  }
}
