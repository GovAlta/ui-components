/**
 * WorkSideMenu Component Configurations
 *
 * WorkSideMenu provides navigation for worker applications.
 */

import type { ComponentConfigurations } from "./types";

export const workSideMenuConfigurations: ComponentConfigurations = {
  componentSlug: "work-side-menu",
  componentName: "Work side menu",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic work side menu",
      description: "Side navigation for internal apps",
      code: {
        react: `<GoabWorkSideMenu
  heading="My Application"
  url="/"
  onNavigate={(path: string) => navigate(path)}
  primaryContent={
    <>
      <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      <GoabWorkSideMenuItem icon="document" label="Reports" url="/reports" />
      <GoabWorkSideMenuItem icon="settings" label="Admin" url="/admin" />
    </>
  }
/>`,
        angular: `<goab-work-side-menu heading="My Application" url="/" (onNavigate)="handleNavigate($event)">
  <div slot="primary-content">
    <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="document" label="Reports" url="/reports"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="settings" label="Admin" url="/admin"></goab-work-side-menu-item>
  </div>
</goab-work-side-menu>`,
        webComponents: `<!-- Listen for _navigate event to handle SPA navigation -->
<goa-work-side-menu heading="My Application" url="/" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="document" label="Reports" url="/reports"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="settings" label="Admin" url="/admin"></goa-work-side-menu-item>
</goa-work-side-menu>

<script>
  document.querySelector("goa-work-side-menu")
    .addEventListener("_navigate", (e) => {
      // Use your router's navigate function here
      window.location.href = e.detail.url;
    });
</script>`,
      },
    },
    {
      id: "with-groups",
      name: "With groups",
      description: "Work menu with expandable groups of items",
      code: {
        react: `
<GoabWorkSideMenu
  heading="My Application"
  url="/"
  open={true}
  onNavigate={(path: string) => navigate(path)}
  primaryContent={
    <>
      <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabWorkSideMenuGroup  icon="document" heading="Documents" open={true} >
        <GoabWorkSideMenuItem label="Invoices" url="/documents/invoices" />
        <GoabWorkSideMenuItem label="Contracts" url="/documents/contracts" />
        <GoabWorkSideMenuItem label="Reports" url="/documents/reports" />
      </GoabWorkSideMenuGroup>
      <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
    </>
  }
/>
        `,
        angular: `
<goab-work-side-menu
  heading="My Application"
  url="/"
  [primaryContent]="primaryTemplate"
  [open]="true"
  (onNavigate)="handleNavigate($event)"
>
  <ng-template #primaryTemplate>
    <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard" />
    <goab-work-side-menu-group icon="document" heading="Documents" [open]="true">
      <goab-work-side-menu-item label="Invoices" url="/documents/invoices" />
      <goab-work-side-menu-item label="Contracts" url="/documents/contracts" />
      <goab-work-side-menu-item label="Reports" url="/documents/reports" />
    </goab-work-side-menu-group>
    <goab-work-side-menu-item icon="list" label="Cases" url="/cases" />
  </ng-template>
</goab-work-side-menu>
        `,
        webComponents: `
<!-- Listen for _navigate event to handle SPA navigation -->
<goa-work-side-menu heading="My Application" url="/" open="true">
  <div slot="primary">
    <goa-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
    <goa-work-side-menu-group icon="document" heading="Documents" open="true">
      <goa-work-side-menu-item label="Invoices" url="/documents/invoices"></goa-work-side-menu-item>
      <goa-work-side-menu-item label="Contracts" url="/documents/contracts"></goa-work-side-menu-item>
      <goa-work-side-menu-item label="Reports" url="/documents/reports"></goa-work-side-menu-item>
    </goa-work-side-menu-group>
    <goa-work-side-menu-item icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  </div>
</goa-work-side-menu>

<script>
  document.querySelector("goa-work-side-menu")
    .addEventListener("_navigate", (e) => {
      // Use your router's navigate function here
      window.location.href = e.detail.url;
    });
</script>
        `,
      },
    },
    {
      id: 'with-notifications',
      name: 'With notifications',
      description: 'Work menu with notification popover panel',
      code: {
        react: `<GoabWorkSideMenu
  heading="My Application"
  url="/"
  primaryContent={
    <>
      <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
    </>
  }
  secondaryContent={
    <>
      <GoabWorkSideMenuItem
        icon="notifications"
        label="Notifications"
        badge="3"
        type="success"
        popoverContent={
          <GoabWorkSideNotificationPanel
            heading="Notifications"
            activeTab="unread"
            onMarkAllRead={() => handleMarkAllRead()}
            onViewAll={() => handleViewAll()}
          >
            <GoabWorkSideNotificationItem
              title="New case assigned"
              description="Case #12345 has been assigned to you."
              timestamp="2025-02-09T10:30:00Z"
              type="info"
              readStatus="unread"
              priority="normal"
              onClick={() => handleClick("1")}
            />
            <GoabWorkSideNotificationItem
              title="System maintenance"
              description="Scheduled maintenance tonight at 11 PM."
              timestamp="2025-02-09T09:00:00Z"
              type="critical"
              readStatus="unread"
              priority="urgent"
              onClick={() => handleClick("2")}
            />
          </GoabWorkSideNotificationPanel>
        }
      />
    </>
  }
/>`,
        angular: `<goab-work-side-menu heading="My Application" url="/">
  <div slot="primary-content">
    <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
  </div>
  <div slot="secondary-content">
    <goab-work-side-menu-item
      icon="notifications"
      label="Notifications"
      badge="3"
      type="success"
      [popoverContent]="notificationsTpl"
    ></goab-work-side-menu-item>
  </div>
</goab-work-side-menu>

<ng-template #notificationsTpl>
  <goab-work-side-notification-panel
    heading="Notifications"
    activeTab="unread"
    (onMarkAllRead)="handleMarkAllRead()"
    (onViewAll)="handleViewAll()"
  >
    <goab-work-side-notification-item
      title="New case assigned"
      description="Case #12345 has been assigned to you."
      timestamp="2025-02-09T10:30:00Z"
      type="info"
      readStatus="unread"
      priority="normal"
      (onClick)="handleClick('1')"
    ></goab-work-side-notification-item>
    <goab-work-side-notification-item
      title="System maintenance"
      description="Scheduled maintenance tonight at 11 PM."
      timestamp="2025-02-09T09:00:00Z"
      type="critical"
      readStatus="unread"
      priority="urgent"
      (onClick)="handleClick('2')"
    ></goab-work-side-notification-item>
  </goab-work-side-notification-panel>
</ng-template>`,
        webComponents: `<goa-work-side-menu heading="My Application" url="/" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="secondary" icon="notifications" label="Notifications" badge="3" type="success">
    <goa-work-side-notification-panel slot="popoverContent" heading="Notifications" active-tab="unread">
      <goa-work-side-notification-item
        title="New case assigned"
        description="Case #12345 has been assigned to you."
        timestamp="2025-02-09T10:30:00Z"
        type="info"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="System maintenance"
        description="Scheduled maintenance tonight at 11 PM."
        timestamp="2025-02-09T09:00:00Z"
        type="critical"
        read-status="unread"
        priority="urgent"
      ></goa-work-side-notification-item>
    </goa-work-side-notification-panel>
  </goa-work-side-menu-item>
</goa-work-side-menu>`,
      },
    },
  ],
};
