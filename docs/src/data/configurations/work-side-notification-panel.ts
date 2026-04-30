/**
 * WorkSideNotificationPanel Component Configurations
 *
 * Notification center panel used within a work side menu item's popover.
 */

import type { ComponentConfigurations } from "./types";
import { workspacePreviewStyle, workspacePreviewWrapper } from "./shared/shared-previews";

export const workSideNotificationPanelConfigurations: ComponentConfigurations = {
  componentSlug: "work-side-notification-panel",
  componentName: "Notification panel",
  defaultConfigurationId: "basic",
  previewStyle: workspacePreviewStyle,
  previewWrapper: workspacePreviewWrapper,

  configurations: [
    {
      id: "basic",
      name: "Basic notification panel",
      description:
        "Panel with a mix of read and unread notifications in a work side menu",
      code: {
        react: {
          ts: `const initialItems: (GoabWorkSideNotificationItemProps & { id: string })[] = [
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

const [items, setItems] = useState(initialItems);

const handleMarkAllRead = () => {
  setItems((items) => items.map((item) => ({ ...item, readStatus: "read" })));
};

const handleViewAll = () => {
  console.log("view all");
};

const handleClick = (id: string) => {
  setItems((items) =>
    items.map((item) => (item.id === id ? { ...item, readStatus: "read" } : item)),
  );
};`,
          jsx: `<GoabWorkSideMenu
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
          onMarkAllRead={handleMarkAllRead}
          onViewAll={handleViewAll}
        >
          {items.map(({ id, ...item }) => (
            <GoabWorkSideNotificationItem
              key={id}
              {...item}
              onClick={() => handleClick(id)}
            />
          ))}
        </GoabWorkSideNotificationPanel>
      }
    />
  }
/>`,
        },
        angular: {
          ts: `interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: GoabWorkSideNotificationItemType;
  readStatus: GoabWorkSideNotificationReadStatus;
  priority: GoabWorkSideNotificationPriority;
}

export class SomeOtherComponent {
  items: NotificationItem[] = [
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

  handleMarkAllRead() {
    this.items = this.items.map((item) => ({ ...item, readStatus: "read" }));
  }

  handleViewAll() {
    console.log("view all");
  }

  handleClick(id: string) {
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, readStatus: "read" } : item,
    );
  }
}`,
          template: `<goab-work-side-menu
  heading="My Application"
  url="/"
  [primaryContent]="primaryTpl"
  [secondaryContent]="secondaryTpl"
  (onNavigate)="handleNavigate($event)"
></goab-work-side-menu>

<ng-template #primaryTpl>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
</ng-template>

<ng-template #secondaryTpl>
  <goab-work-side-menu-item
    icon="notifications"
    label="Notifications"
    badge="2"
    type="success"
    [popoverContent]="notificationsTpl"
  ></goab-work-side-menu-item>
</ng-template>

<ng-template #notificationsTpl>
  <goab-work-side-notification-panel
    heading="Notifications"
    activeTab="unread"
    (onMarkAllRead)="handleMarkAllRead()"
    (onViewAll)="handleViewAll()"
  >
    @for (item of items; track item.id) {
      <goab-work-side-notification-item
        [title]="item.title"
        [description]="item.description"
        [timestamp]="item.timestamp"
        [type]="item.type"
        [readStatus]="item.readStatus"
        [priority]="item.priority"
        (onClick)="handleClick(item.id)"
      ></goab-work-side-notification-item>
    }
  </goab-work-side-notification-panel>
</ng-template>`,
        },
        webComponents: {
          html: `<goa-work-side-menu heading="My Application" url="/" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="secondary" icon="notifications" label="Notifications" badge="2" type="success">
    <goa-work-side-notification-panel slot="popoverContent" heading="Notifications" active-tab="unread">
      <goa-work-side-notification-item
        title="New case assigned"
        description="Case #12345 has been assigned to you for review."
        timestamp="2025-03-15T10:30:00Z"
        type="info"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="Document uploaded"
        description="A new document was uploaded to Case #12340."
        timestamp="2025-03-15T09:15:00Z"
        type="default"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="Case resolved"
        description="Case #12330 has been marked as resolved."
        timestamp="2025-03-14T16:00:00Z"
        type="success"
        read-status="read"
        priority="normal"
      ></goa-work-side-notification-item>
    </goa-work-side-notification-panel>
  </goa-work-side-menu-item>
</goa-work-side-menu>`,
          js: `const panel = container.querySelector("goa-work-side-notification-panel");
const items = container.querySelectorAll("goa-work-side-notification-item");

items.forEach((item) => {
  item.addEventListener("_click", () => {
    item.setAttribute("read-status", "read");
  });
});

panel.addEventListener("_markAllRead", () => {
  items.forEach((item) => item.setAttribute("read-status", "read"));
});

panel.addEventListener("_viewAll", () => {
  console.log("view all");
});`,
        },
      },
    },
    {
      id: "urgent-notifications",
      name: "With urgent notifications",
      description: "Menu with urgent priority notifications in the panel",
      code: {
        react: {
          ts: `const initialItems: (GoabWorkSideNotificationItemProps & { id: string })[] = [
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

const [items, setItems] = useState(initialItems);

const handleMarkAllRead = () => {
  setItems((items) => items.map((item) => ({ ...item, readStatus: "read" })));
};

const handleViewAll = () => {
  console.log("view all");
};

const handleClick = (id: string) => {
  setItems((items) =>
    items.map((item) => (item.id === id ? { ...item, readStatus: "read" } : item)),
  );
};`,
          jsx: `<GoabWorkSideMenu
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
          onMarkAllRead={handleMarkAllRead}
          onViewAll={handleViewAll}
        >
          {items.map(({ id, ...item }) => (
            <GoabWorkSideNotificationItem
              key={id}
              {...item}
              onClick={() => handleClick(id)}
            />
          ))}
        </GoabWorkSideNotificationPanel>
      }
    />
  }
/>`,
        },
        angular: {
          ts: `interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: GoabWorkSideNotificationItemType;
  readStatus: GoabWorkSideNotificationReadStatus;
  priority: GoabWorkSideNotificationPriority;
}

export class SomeOtherComponent {
  items: NotificationItem[] = [
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

  handleMarkAllRead() {
    this.items = this.items.map((item) => ({ ...item, readStatus: "read" }));
  }

  handleViewAll() {
    console.log("view all");
  }

  handleClick(id: string) {
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, readStatus: "read" } : item,
    );
  }
}`,
          template: `<goab-work-side-menu
  heading="My Application"
  url="/"
  [primaryContent]="primaryTpl"
  [secondaryContent]="secondaryTpl"
  (onNavigate)="handleNavigate($event)"
></goab-work-side-menu>

<ng-template #primaryTpl>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
</ng-template>

<ng-template #secondaryTpl>
  <goab-work-side-menu-item
    icon="notifications"
    label="Notifications"
    badge="2"
    type="emergency"
    [popoverContent]="notificationsTpl"
  ></goab-work-side-menu-item>
</ng-template>

<ng-template #notificationsTpl>
  <goab-work-side-notification-panel
    heading="Notifications"
    activeTab="urgent"
    (onMarkAllRead)="handleMarkAllRead()"
    (onViewAll)="handleViewAll()"
  >
    @for (item of items; track item.id) {
      <goab-work-side-notification-item
        [title]="item.title"
        [description]="item.description"
        [timestamp]="item.timestamp"
        [type]="item.type"
        [readStatus]="item.readStatus"
        [priority]="item.priority"
        (onClick)="handleClick(item.id)"
      ></goab-work-side-notification-item>
    }
  </goab-work-side-notification-panel>
</ng-template>`,
        },
        webComponents: {
          html: `<goa-work-side-menu heading="My Application" url="/" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="secondary" icon="notifications" label="Notifications" badge="2" type="emergency">
    <goa-work-side-notification-panel slot="popoverContent" heading="Notifications" active-tab="urgent">
      <goa-work-side-notification-item
        title="System maintenance"
        description="Scheduled maintenance tonight at 11 PM. All services will be unavailable."
        timestamp="2025-03-15T14:00:00Z"
        type="critical"
        read-status="unread"
        priority="urgent"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="Deadline approaching"
        description="Case #12345 response is due in 2 hours."
        timestamp="2025-03-15T12:00:00Z"
        type="warning"
        read-status="unread"
        priority="urgent"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="New comment on case"
        description="A team member commented on Case #12340."
        timestamp="2025-03-15T11:00:00Z"
        type="default"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
    </goa-work-side-notification-panel>
  </goa-work-side-menu-item>
</goa-work-side-menu>`,
          js: `const panel = container.querySelector("goa-work-side-notification-panel");
const items = container.querySelectorAll("goa-work-side-notification-item");

items.forEach((item) => {
  item.addEventListener("_click", () => {
    item.setAttribute("read-status", "read");
  });
});

panel.addEventListener("_markAllRead", () => {
  items.forEach((item) => item.setAttribute("read-status", "read"));
});

panel.addEventListener("_viewAll", () => {
  console.log("view all");
});`,
        },
      },
    },
    {
      id: "notification-types",
      name: "Notification type badges",
      description: "All notification item type variants with their badge icons",
      code: {
        react: {
          ts: `const initialItems: (GoabWorkSideNotificationItemProps & { id: string })[] = [
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

const [items, setItems] = useState(initialItems);

const handleMarkAllRead = () => {
  setItems((items) => items.map((item) => ({ ...item, readStatus: "read" })));
};

const handleViewAll = () => {
  console.log("view all");
};

const handleClick = (id: string) => {
  setItems((items) =>
    items.map((item) => (item.id === id ? { ...item, readStatus: "read" } : item)),
  );
};`,
          jsx: `<GoabWorkSideMenu
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
          onMarkAllRead={handleMarkAllRead}
          onViewAll={handleViewAll}
        >
          {items.map(({ id, ...item }) => (
            <GoabWorkSideNotificationItem
              key={id}
              {...item}
              onClick={() => handleClick(id)}
            />
          ))}
        </GoabWorkSideNotificationPanel>
      }
    />
  }
/>`,
        },
        angular: {
          ts: `interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: GoabWorkSideNotificationItemType;
  readStatus: GoabWorkSideNotificationReadStatus;
  priority: GoabWorkSideNotificationPriority;
}

export class SomeOtherComponent {
  items: NotificationItem[] = [
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

  handleMarkAllRead() {
    this.items = this.items.map((item) => ({ ...item, readStatus: "read" }));
  }

  handleViewAll() {
    console.log("view all");
  }

  handleClick(id: string) {
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, readStatus: "read" } : item,
    );
  }
}`,
          template: `<goab-work-side-menu
  heading="My Application"
  url="/"
  [primaryContent]="primaryTpl"
  [secondaryContent]="secondaryTpl"
  (onNavigate)="handleNavigate($event)"
></goab-work-side-menu>

<ng-template #primaryTpl>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
</ng-template>

<ng-template #secondaryTpl>
  <goab-work-side-menu-item
    icon="notifications"
    label="Notifications"
    badge="5"
    type="success"
    [popoverContent]="notificationsTpl"
  ></goab-work-side-menu-item>
</ng-template>

<ng-template #notificationsTpl>
  <goab-work-side-notification-panel
    heading="Notifications"
    activeTab="all"
    (onMarkAllRead)="handleMarkAllRead()"
    (onViewAll)="handleViewAll()"
  >
    @for (item of items; track item.id) {
      <goab-work-side-notification-item
        [title]="item.title"
        [description]="item.description"
        [timestamp]="item.timestamp"
        [type]="item.type"
        [readStatus]="item.readStatus"
        [priority]="item.priority"
        (onClick)="handleClick(item.id)"
      ></goab-work-side-notification-item>
    }
  </goab-work-side-notification-panel>
</ng-template>`,
        },
        webComponents: {
          html: `<goa-work-side-menu heading="My Application" url="/" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="secondary" icon="notifications" label="Notifications" badge="5" type="success">
    <goa-work-side-notification-panel slot="popoverContent" heading="Notifications" active-tab="all">
      <goa-work-side-notification-item
        title="New comment on case"
        description="A team member commented on Case #12340."
        timestamp="2025-03-15T10:00:00Z"
        type="default"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="Case #12345 assigned"
        description="Case #12345 has been assigned to you for review."
        timestamp="2025-03-15T09:00:00Z"
        type="info"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="Case resolved"
        description="Case #12330 has been marked as resolved."
        timestamp="2025-03-15T08:00:00Z"
        type="success"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="Deadline approaching"
        description="Case #12345 response is due in 2 hours."
        timestamp="2025-03-15T07:00:00Z"
        type="warning"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
      <goa-work-side-notification-item
        title="System maintenance"
        description="Scheduled maintenance tonight at 11 PM. All services will be unavailable."
        timestamp="2025-03-15T06:00:00Z"
        type="critical"
        read-status="unread"
        priority="normal"
      ></goa-work-side-notification-item>
    </goa-work-side-notification-panel>
  </goa-work-side-menu-item>
</goa-work-side-menu>`,
          js: `const panel = container.querySelector("goa-work-side-notification-panel");
const items = container.querySelectorAll("goa-work-side-notification-item");

items.forEach((item) => {
  item.addEventListener("_click", () => {
    item.setAttribute("read-status", "read");
  });
});

panel.addEventListener("_markAllRead", () => {
  items.forEach((item) => item.setAttribute("read-status", "read"));
});

panel.addEventListener("_viewAll", () => {
  console.log("view all");
});`,
        },
      },
    },
  ],
};
