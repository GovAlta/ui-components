/**
 * Workspace Layout Component Configurations
 *
 * Full-page shell for worker applications: a side menu, a sticky page header,
 * a scrollable content area, an optional sticky footer for contextual actions,
 * and an optional push drawer.
 *
 * The component sets its own height to 100vh. The preview bounds it with an
 * inline height so it renders as a contained workspace instead of filling the
 * whole docs page (inline style overrides the :host height rule).
 */

import type { ComponentConfigurations } from "./types";

export const workspaceLayoutConfigurations: ComponentConfigurations = {
  componentSlug: "workspace-layout",
  componentName: "Workspace Layout",
  defaultConfigurationId: "basic",

  // The layout fills its parent — strip the sandbox padding so it sits flush.
  previewStyle: "padding: 0;",

  configurations: [
    {
      id: "basic",
      name: "Basic workspace",
      description:
        "A side menu and a scrollable content area. The simplest shell, before you add a sticky header, footer, or push drawer.",
      code: {
        react: {
          ts: `const rows = Array.from({ length: 16 }, (_, i) => i + 1);

const sideMenu = (
  <GoabWorkSideMenu
    heading="Workspace layout"
    url="/"
    onNavigate={(path: string) => navigate(path)}
    primaryContent={
      <>
        <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
        <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
        <GoabWorkSideMenuItem icon="document" label="Reports" url="/reports" />
      </>
    }
  />
);`,
          jsx: `<GoabWorkspaceLayout sideMenu={sideMenu}>
  <div style={{ padding: "24px" }}>
    {rows.map((n) => (
      <p key={n}>
        Case row {n} — scroll this area while the side menu stays in place.
      </p>
    ))}
  </div>
</GoabWorkspaceLayout>`,
        },
        angular: {
          ts: `export class SomeComponent {
  rows = Array.from({ length: 16 }, (_, i) => i + 1);
  handleNavigate(path: string) {
    // route to path
  }
}`,
          template: `<goab-workspace-layout [sideMenu]="sideMenuTpl">
  <div style="padding: 24px">
    @for (n of rows; track n) {
      <p>Case row {{ n }} — scroll this area while the side menu stays in place.</p>
    }
  </div>
</goab-workspace-layout>

<ng-template #sideMenuTpl>
  <goab-work-side-menu heading="Workspace layout" url="/" [primaryContent]="menuItems" (onNavigate)="handleNavigate($event)"></goab-work-side-menu>
</ng-template>
<ng-template #menuItems>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="document" label="Reports" url="/reports"></goab-work-side-menu-item>
</ng-template>`,
        },
        webComponents: `<goa-workspace-layout style="height: 600px;">
  <goa-work-side-menu slot="side-menu" heading="Workspace layout" url="/" open="true">
    <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="document" label="Reports" url="/reports"></goa-work-side-menu-item>
  </goa-work-side-menu>

  <div id="wsl-basic-body" style="padding: 24px"></div>
</goa-workspace-layout>
<script>
  document.getElementById("wsl-basic-body").innerHTML = Array.from(
    { length: 16 },
    (_, i) => \`<p>Case row \${i + 1} — scroll this area while the side menu stays in place.</p>\`,
  ).join("");
</script>`,
      },
    },
    {
      id: "sticky-header",
      name: "Sticky header",
      description:
        "Add a sticky page header for the page title and key actions. It stays pinned while the content scrolls, and a soft shadow appears under it once content scrolls past.",
      code: {
        react: {
          ts: `const rows = Array.from({ length: 16 }, (_, i) => i + 1);

const sideMenu = (
  <GoabWorkSideMenu
    heading="Workspace layout"
    url="/"
    onNavigate={(path: string) => navigate(path)}
    primaryContent={
      <>
        <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
        <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      </>
    }
  />
);

const pageHeader = (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
    <GoabText tag="h1" size="heading-m" mt="none" mb="none">My cases</GoabText>
    <GoabButtonGroup alignment="end">
      <GoabButton type="secondary" size="compact">Filter</GoabButton>
      <GoabButton type="primary" size="compact">New case</GoabButton>
    </GoabButtonGroup>
  </div>
);`,
          jsx: `<GoabWorkspaceLayout sideMenu={sideMenu} pageHeader={pageHeader}>
  <div style={{ padding: "24px" }}>
    {rows.map((n) => (
      <p key={n}>
        Case row {n} — scroll this area and the header stays pinned at the top.
      </p>
    ))}
  </div>
</GoabWorkspaceLayout>`,
        },
        angular: {
          ts: `export class SomeComponent {
  rows = Array.from({ length: 16 }, (_, i) => i + 1);
  handleNavigate(path: string) {
    // route to path
  }
}`,
          template: `<goab-workspace-layout [sideMenu]="sideMenuTpl" [pageHeader]="pageHeaderTpl">
  <div style="padding: 24px">
    @for (n of rows; track n) {
      <p>Case row {{ n }} — scroll this area and the header stays pinned at the top.</p>
    }
  </div>
</goab-workspace-layout>

<ng-template #sideMenuTpl>
  <goab-work-side-menu heading="Workspace layout" url="/" [primaryContent]="menuItems" (onNavigate)="handleNavigate($event)"></goab-work-side-menu>
</ng-template>
<ng-template #menuItems>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
</ng-template>
<ng-template #pageHeaderTpl>
  <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
    <goab-text tag="h1" size="heading-m" mt="none" mb="none">My cases</goab-text>
    <goab-button-group alignment="end">
      <goab-button type="secondary" size="compact">Filter</goab-button>
      <goab-button type="primary" size="compact">New case</goab-button>
    </goab-button-group>
  </div>
</ng-template>`,
        },
        webComponents: `<goa-workspace-layout style="height: 600px;">
  <goa-work-side-menu slot="side-menu" heading="Workspace layout" url="/" open="true">
    <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  </goa-work-side-menu>

  <div slot="page-header" style="display:flex;align-items:center;justify-content:space-between;width:100%">
    <goa-text tag="h1" size="heading-m" mt="none" mb="none">My cases</goa-text>
    <goa-button-group alignment="end">
      <goa-button type="secondary" size="compact" version="2">Filter</goa-button>
      <goa-button type="primary" size="compact" version="2">New case</goa-button>
    </goa-button-group>
  </div>

  <div id="wsl-header-body" style="padding: 24px"></div>
</goa-workspace-layout>
<script>
  document.getElementById("wsl-header-body").innerHTML = Array.from(
    { length: 16 },
    (_, i) => \`<p>Case row \${i + 1} — scroll this area and the header stays pinned at the top.</p>\`,
  ).join("");
</script>`,
      },
    },
    {
      id: "sticky-footer",
      name: "Sticky footer",
      description:
        "Add a sticky page footer for a summary or contextual actions, such as a bar of bulk actions. It stays pinned to the bottom while the content scrolls, with a soft shadow above it once content scrolls underneath.",
      code: {
        react: {
          ts: `const rows = Array.from({ length: 16 }, (_, i) => i + 1);

const sideMenu = (
  <GoabWorkSideMenu
    heading="Workspace layout"
    url="/"
    onNavigate={(path: string) => navigate(path)}
    primaryContent={
      <>
        <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
        <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      </>
    }
  />
);

const pageFooter = (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
    <GoabText size="body-s" mt="none" mb="none">3 cases selected</GoabText>
    <GoabButtonGroup alignment="end">
      <GoabButton type="secondary" size="compact">Clear</GoabButton>
      <GoabButton type="primary" size="compact">Export</GoabButton>
    </GoabButtonGroup>
  </div>
);`,
          jsx: `<GoabWorkspaceLayout sideMenu={sideMenu} pageFooter={pageFooter}>
  <div style={{ padding: "24px" }}>
    {rows.map((n) => (
      <p key={n}>
        Case row {n} — scroll this area and the footer stays pinned at the bottom.
      </p>
    ))}
  </div>
</GoabWorkspaceLayout>`,
        },
        angular: {
          ts: `export class SomeComponent {
  rows = Array.from({ length: 16 }, (_, i) => i + 1);
  handleNavigate(path: string) {
    // route to path
  }
}`,
          template: `<goab-workspace-layout [sideMenu]="sideMenuTpl" [pageFooter]="pageFooterTpl">
  <div style="padding: 24px">
    @for (n of rows; track n) {
      <p>Case row {{ n }} — scroll this area and the footer stays pinned at the bottom.</p>
    }
  </div>
</goab-workspace-layout>

<ng-template #sideMenuTpl>
  <goab-work-side-menu heading="Workspace layout" url="/" [primaryContent]="menuItems" (onNavigate)="handleNavigate($event)"></goab-work-side-menu>
</ng-template>
<ng-template #menuItems>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
</ng-template>
<ng-template #pageFooterTpl>
  <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
    <goab-text size="body-s" mt="none" mb="none">3 cases selected</goab-text>
    <goab-button-group alignment="end">
      <goab-button type="secondary" size="compact">Clear</goab-button>
      <goab-button type="primary" size="compact">Export</goab-button>
    </goab-button-group>
  </div>
</ng-template>`,
        },
        webComponents: `<goa-workspace-layout style="height: 600px;">
  <goa-work-side-menu slot="side-menu" heading="Workspace layout" url="/" open="true">
    <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  </goa-work-side-menu>

  <div id="wsl-footer-body" style="padding: 24px"></div>

  <div slot="page-footer" style="display:flex;align-items:center;justify-content:space-between;width:100%">
    <goa-text size="body-s" mt="none" mb="none">3 cases selected</goa-text>
    <goa-button-group alignment="end">
      <goa-button type="secondary" size="compact" version="2">Clear</goa-button>
      <goa-button type="primary" size="compact" version="2">Export</goa-button>
    </goa-button-group>
  </div>
</goa-workspace-layout>
<script>
  document.getElementById("wsl-footer-body").innerHTML = Array.from(
    { length: 16 },
    (_, i) => \`<p>Case row \${i + 1} — scroll this area and the footer stays pinned at the bottom.</p>\`,
  ).join("");
</script>`,
      },
    },
    {
      id: "push-drawer",
      name: "Push drawer",
      description:
        "An optional drawer that opens beside the content instead of over it. It narrows the content rather than covering it, so people can still work with the page while the drawer is open. The side menu stays in place.",
      code: {
        react: {
          ts: `const [open, setOpen] = useState(false);

const sideMenu = (
  <GoabWorkSideMenu
    heading="Workspace layout"
    url="/"
    onNavigate={(path: string) => navigate(path)}
    primaryContent={
      <>
        <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
        <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      </>
    }
  />
);

const drawer = (
  <GoabPushDrawer heading="Case details" open={open} onClose={() => setOpen(false)}>
    {/* drawer content */}
  </GoabPushDrawer>
);`,
          jsx: `<GoabWorkspaceLayout sideMenu={sideMenu} pushDrawer={drawer}>
  <div style={{ padding: "24px" }}>
    <GoabButton size="compact" onClick={() => setOpen(true)}>Open</GoabButton>
    {/* main page content */}
  </div>
</GoabWorkspaceLayout>`,
        },
        angular: {
          ts: `export class SomeComponent {
  open = false;
  handleNavigate(path: string) {
    // route to path
  }
}`,
          template: `<goab-workspace-layout [sideMenu]="sideMenuTpl" [pushDrawer]="drawerTpl">
  <div style="padding: 24px">
    <goab-button size="compact" (onClick)="open = true">Open</goab-button>
    <!-- main page content -->
  </div>
</goab-workspace-layout>

<ng-template #sideMenuTpl>
  <goab-work-side-menu heading="Workspace layout" url="/" [primaryContent]="menuItems" (onNavigate)="handleNavigate($event)"></goab-work-side-menu>
</ng-template>
<ng-template #menuItems>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
</ng-template>
<ng-template #drawerTpl>
  <goab-push-drawer heading="Case details" [open]="open" (onClose)="open = false">
    <!-- drawer content -->
  </goab-push-drawer>
</ng-template>`,
        },
        webComponents: `<goa-workspace-layout style="height: 600px;">
  <goa-work-side-menu slot="side-menu" heading="Workspace layout" url="/" open="true">
    <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  </goa-work-side-menu>

  <div style="padding: 24px">
    <goa-button id="wsl-open-drawer" type="primary" size="compact" version="2">Open</goa-button>
    <div id="wsl-drawer-body" style="margin-top: 16px"></div>
  </div>

  <goa-push-drawer id="wsl-drawer" slot="push-drawer" heading="Case details" width="360px" version="2">
    <div id="wsl-drawer-content" style="padding: 0 4px"></div>
  </goa-push-drawer>
</goa-workspace-layout>
<script>
  document.getElementById("wsl-drawer-body").innerHTML = Array.from(
    { length: 16 },
    (_, i) => \`<p>Case row \${i + 1} — open the drawer and it appears beside this content, narrowing it instead of covering it.</p>\`,
  ).join("");
  document.getElementById("wsl-drawer-content").innerHTML = "<p>Details for the selected case appear here, beside the page content.</p>";
  var openBtn = document.getElementById("wsl-open-drawer");
  var drawer = document.getElementById("wsl-drawer");
  if (openBtn && drawer) {
    // open is a boolean prop, so toggle the property, not the attribute
    // (the string "false" would be truthy).
    openBtn.addEventListener("_click", function () { drawer.open = true; });
    drawer.addEventListener("_close", function () { drawer.open = false; });
  }
</script>`,
      },
    },
    {
      id: "monitor-scroll-state",
      name: "Monitor scroll state",
      description:
        "React to scroll progress inside the layout. Here the page header collapses its subtitle once content scrolls past the top. React exposes the useGoabWorkspaceLayoutScrollState hook, Angular the GoabWorkspaceLayoutScrollStateService (signals), and the web component a _scrollStateChange event. The scroll states are no-scroll, at-top, middle, and at-bottom.",
      code: {
        react: {
          ts: `import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
  useGoabWorkspaceLayoutScrollState,
} from "@abgov/react-components";

const rows = Array.from({ length: 20 }, (_, i) => i + 1);

const sideMenu = (
  <GoabWorkSideMenu
    heading="Workspace layout"
    url="/"
    primaryContent={
      <>
        <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
        <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      </>
    }
  />
);

function PageHeader() {
  const { scrollPosition } = useGoabWorkspaceLayoutScrollState();
  const collapsed =
    scrollPosition === "middle" || scrollPosition === "at-bottom";
  return (
    <div>
      <h1 style={{ margin: 0 }}>My cases</h1>
      {!collapsed && (
        <p style={{ margin: 0 }}>Scroll down to collapse this subtitle.</p>
      )}
    </div>
  );
}`,
          jsx: `<GoabWorkspaceLayout sideMenu={sideMenu} pageHeader={<PageHeader />}>
  <div style={{ padding: "24px" }}>
    {rows.map((n) => (
      <p key={n}>Case row {n}</p>
    ))}
  </div>
</GoabWorkspaceLayout>`,
        },
        angular: {
          ts: `import { computed, inject } from "@angular/core";
import { GoabWorkspaceLayoutScrollStateService } from "@abgov/angular-components";

export class SomeComponent {
  rows = Array.from({ length: 20 }, (_, i) => i + 1);

  // The service is populated by goab-workspace-layout; read its signals anywhere.
  private scrollState = inject(GoabWorkspaceLayoutScrollStateService);

  // Collapse once the user scrolls past the top.
  collapsed = computed(() => {
    const pos = this.scrollState.scrollPosition();
    return pos === "middle" || pos === "at-bottom";
  });
}`,
          template: `<goab-workspace-layout [sideMenu]="sideMenuTpl" [pageHeader]="pageHeaderTpl">
  <div style="padding: 24px">
    @for (n of rows; track n) {
      <p>Case row {{ n }}</p>
    }
  </div>
</goab-workspace-layout>

<ng-template #pageHeaderTpl>
  <h1 style="margin: 0">My cases</h1>
  @if (!collapsed()) {
    <p style="margin: 0">Scroll down to collapse this subtitle.</p>
  }
</ng-template>

<ng-template #sideMenuTpl>
  <goab-work-side-menu heading="Workspace layout" url="/" [primaryContent]="menuItems"></goab-work-side-menu>
</ng-template>
<ng-template #menuItems>
  <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
  <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
</ng-template>`,
        },
        webComponents: `<goa-workspace-layout id="wsl-scroll" style="height: 600px;">
  <goa-work-side-menu slot="side-menu" heading="Workspace layout" url="/" open="true">
    <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
    <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  </goa-work-side-menu>

  <div slot="page-header">
    <goa-text tag="h1" size="heading-m" mt="none" mb="none">My cases</goa-text>
    <goa-text id="wsl-scroll-subtitle" size="body-s" mt="none" mb="none">Scroll down to collapse this subtitle.</goa-text>
  </div>

  <div id="wsl-scroll-body" style="padding: 24px"></div>
</goa-workspace-layout>
<script>
  document.getElementById("wsl-scroll-body").innerHTML = Array.from(
    { length: 20 },
    (_, i) => \`<p>Case row \${i + 1}</p>\`,
  ).join("");

  // The web component dispatches _scrollStateChange; e.detail = { state, isScrollable }.
  document.getElementById("wsl-scroll").addEventListener("_scrollStateChange", function (e) {
    var collapsed = e.detail.state === "middle" || e.detail.state === "at-bottom";
    document.getElementById("wsl-scroll-subtitle").style.display = collapsed ? "none" : "";
  });
</script>`,
      },
    },
  ],
};
