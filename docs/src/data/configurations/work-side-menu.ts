/**
 * WorkSideMenu Component Configurations
 *
 * WorkSideMenu provides navigation for worker applications.
 */

import type { ComponentConfigurations } from "./types";
import { workspacePreviewStyle, workspacePreviewWrapper } from "./shared/shared-previews";

export const workSideMenuConfigurations: ComponentConfigurations = {
  componentSlug: "work-side-menu",
  componentName: "Work side menu",
  defaultConfigurationId: "basic",
  previewStyle: workspacePreviewStyle,
  previewWrapper: workspacePreviewWrapper,

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
        webComponents: `<goa-work-side-menu heading="My Application" url="/" open="true">
    <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="document" label="Reports" url="/reports"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="settings" label="Admin" url="/admin"></goa-work-side-menu-item>
  </goa-work-side-menu>`,
      },
    },
    {
      id: "with-user-profile",
      name: "With user profile",
      description: "Menu showing user name and role with an account menu",
      code: {
        react: `<GoabWorkSideMenu
  heading="My Application"
  url="/"
  userName="Jane Smith"
  userSecondaryText="Case Worker"
  onNavigate={(path: string) => navigate(path)}
  primaryContent={
    <>
      <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
    </>
  }
  accountContent={
    <>
      <GoabWorkSideMenuItem icon="person-circle" label="Profile" url="/profile" />
      <GoabWorkSideMenuItem icon="settings" label="Settings" url="/settings" />
      <GoabWorkSideMenuItem icon="log-out" label="Sign out" url="/sign-out" />
    </>
  }
/>`,
        angular: `<goab-work-side-menu
  heading="My Application"
  url="/"
  userName="Jane Smith"
  userSecondaryText="Case Worker"
  [primaryContent]="primaryTpl"
  [accountContent]="accountTpl"
  (onNavigate)="handleNavigate($event)"
></goab-work-side-menu>

<ng-template #primaryTpl>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
</ng-template>

<ng-template #accountTpl>
  <goab-work-side-menu-item icon="person-circle" label="Profile" url="/profile"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="settings" label="Settings" url="/settings"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="log-out" label="Sign out" url="/sign-out"></goab-work-side-menu-item>
</ng-template>`,
        webComponents: `<goa-work-side-menu heading="My Application" url="/" user-name="Jane Smith" user-secondary-text="Case Worker" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="account" icon="person-circle" label="Profile" url="/profile"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="account" icon="settings" label="Settings" url="/settings"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="account" icon="log-out" label="Sign out" url="/sign-out"></goa-work-side-menu-item>
</goa-work-side-menu>`,
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
        webComponents: `<goa-work-side-menu heading="My Application" url="/" open="true">
    <div slot="primary">
      <goa-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
      <goa-work-side-menu-group icon="document" heading="Documents" open="true">
        <goa-work-side-menu-item label="Invoices" url="/documents/invoices"></goa-work-side-menu-item>
        <goa-work-side-menu-item label="Contracts" url="/documents/contracts"></goa-work-side-menu-item>
        <goa-work-side-menu-item label="Reports" url="/documents/reports"></goa-work-side-menu-item>
      </goa-work-side-menu-group>
      <goa-work-side-menu-item icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
    </div>
  </goa-work-side-menu>`,
      },
    },
    {
      id: "secondary-menu",
      name: "Secondary menu",
      description: "Drilled-in menu with back navigation",
      code: {
        react: `<GoabWorkSideMenu
  heading="Case Management"
  url="/cases"
  open={true}
  onNavigate={(path: string) => navigate(path)}
  primaryContent={
    <>
      <GoabWorkSideMenuItem icon="arrow-back" label="All cases" url="/cases" />
      <GoabWorkSideMenuItem label="Overview" url="/cases/123/overview" />
      <GoabWorkSideMenuItem label="Documents" url="/cases/123/documents" />
      <GoabWorkSideMenuItem label="Notes" url="/cases/123/notes" />
      <GoabWorkSideMenuItem label="Activity log" url="/cases/123/activity" />
      <GoabWorkSideMenuItem label="Payments" url="/cases/123/payments" />
    </>
  }
/>`,
        angular: `<goab-work-side-menu heading="Case Management" url="/cases" [open]="true" (onNavigate)="handleNavigate($event)" [primaryContent]="primaryTpl">
  <ng-template #primaryTpl>
    <goab-work-side-menu-item icon="arrow-back" label="All cases" url="/cases"></goab-work-side-menu-item>
    <goab-work-side-menu-item label="Overview" url="/cases/123/overview"></goab-work-side-menu-item>
    <goab-work-side-menu-item label="Documents" url="/cases/123/documents"></goab-work-side-menu-item>
    <goab-work-side-menu-item label="Notes" url="/cases/123/notes"></goab-work-side-menu-item>
    <goab-work-side-menu-item label="Activity log" url="/cases/123/activity"></goab-work-side-menu-item>
    <goab-work-side-menu-item label="Payments" url="/cases/123/payments"></goab-work-side-menu-item>
  </ng-template>
</goab-work-side-menu>`,
        webComponents: `<goa-work-side-menu heading="Case Management" url="/cases" open="true">
  <goa-work-side-menu-item slot="primary" icon="arrow-back" label="All cases" url="/cases"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" label="Overview" url="/cases/123/overview"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" label="Documents" url="/cases/123/documents"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" label="Notes" url="/cases/123/notes"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" label="Activity log" url="/cases/123/activity"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" label="Payments" url="/cases/123/payments"></goa-work-side-menu-item>
</goa-work-side-menu>`,
      },
    },
    {
      id: "with-notifications",
      name: "With notifications",
      description: "Work menu with notification popover panel",
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
