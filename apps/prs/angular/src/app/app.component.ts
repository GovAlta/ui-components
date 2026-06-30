import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabPushDrawer,
  GoabThemeService,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuGroup,
  GoabWorkSideNotificationPanel,
  GoabWorkSideNotificationItem,
  GoabWorkspaceLayout,
} from "@abgov/angular-components";
import { PushDrawerHostService } from "../routes/features/feat3347PushDrawer/push-drawer-host.service";
import {
  bugRouteDefinitions,
  docsRouteDefinitions,
  featureRouteDefinitions,
} from "./generated/pr-route-manifest.generated";
import {
  applyTokenVersion,
  resolveTokenVersion,
  TokenVersion,
} from "./token-version/token-version";

// Sentinel URL handled by handleNavigate to toggle tokens instead of routing.
const TOKEN_TOGGLE_URL = "#tokens";

interface NotificationData {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "critical";
  readStatus: "read" | "unread";
  priority: "normal" | "urgent";
}

@Component({
  standalone: true,
  selector: "abgov-root",
  templateUrl: "./app.component.html",
  styles: ``,
  imports: [
    RouterOutlet,
    GoabAppFooter,
    GoabAppHeader,
    GoabButton,
    GoabButtonGroup,
    GoabPushDrawer,
    GoabBadge,
    GoabWorkSideMenu,
    GoabWorkSideMenuItem,
    GoabWorkSideMenuGroup,
    GoabWorkSideNotificationPanel,
    GoabWorkSideNotificationItem,
    GoabWorkspaceLayout,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  isFullPage = false;
  isPushDrawerRoute = false;
  readonly bugRouteDefinitions = bugRouteDefinitions;
  readonly featureRouteDefinitions = featureRouteDefinitions;
  readonly docsRouteDefinitions = docsRouteDefinitions;
  readonly baseHref = inject(LocationStrategy).getBaseHref();
  readonly tokenToggleUrl = TOKEN_TOGGLE_URL;
  tokenMode: TokenVersion = resolveTokenVersion();
  readonly pushDrawerParagraphs = Array.from({ length: 30 }, (_, i) => i + 1);

  // Sample notifications for the work-side-menu notification panel (#4110 test).
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
      title: "Deadline approaching",
      description: "Case #12300 deadline is in 24 hours.",
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      type: "warning",
      readStatus: "read",
      priority: "urgent",
    },
  ];

  private fullPageRoutes = ["/features/2885"];
  private router = inject(Router);
  readonly theme = inject(GoabThemeService);
  private pushDrawerHost = inject(PushDrawerHostService);
  readonly pushDrawerOpen = this.pushDrawerHost.open;

  constructor() {
    const initialUrl = window.location.pathname.startsWith(this.baseHref)
      ? "/" + window.location.pathname.slice(this.baseHref.length)
      : window.location.pathname;
    this.isFullPage = this.fullPageRoutes.includes(initialUrl);
    this.isPushDrawerRoute = initialUrl.startsWith("/features/3347-push");
    if (this.isPushDrawerRoute) this.pushDrawerHost.openDrawer();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = (event as NavigationEnd).urlAfterRedirects;
        this.isFullPage = this.fullPageRoutes.includes(url);
        this.isPushDrawerRoute = url.startsWith("/features/3347-push");
        if (this.isPushDrawerRoute) this.pushDrawerHost.openDrawer();
      });
  }

  closePushDrawer() {
    this.pushDrawerHost.closeDrawer();
  }

  handleNotificationClick(id: string): void {
    this.notifications = this.notifications.map((notif) =>
      notif.id === id && notif.readStatus === "unread"
        ? { ...notif, readStatus: "read" as const }
        : notif,
    );
  }

  handleMarkAllRead(): void {
    this.notifications = this.notifications.map((notif) => ({
      ...notif,
      readStatus: "read" as const,
    }));
  }

  handleViewAll(): void {
    console.log("View all notifications");
  }

  // Required so GoabWorkSideNotificationItem re-renders read status correctly.
  trackById(_index: number, notif: NotificationData): string {
    return notif.id;
  }

  handleNavigate(path: string): void {
    if (path === TOKEN_TOGGLE_URL) {
      this.tokenMode = this.tokenMode === "v1" ? "v2" : "v1";
      applyTokenVersion(this.tokenMode);
      return;
    }
    if (path === "#toggle-theme") {
      this.theme.toggle();
      return;
    }
    const internal = path.startsWith(this.baseHref)
      ? "/" + path.slice(this.baseHref.length)
      : path;
    this.router.navigateByUrl(internal);
  }
}
