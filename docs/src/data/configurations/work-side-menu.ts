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
        react: `<GoabxWorkSideMenu
  heading="My Application"
  url="/"
  onNavigate={(path: string) => navigate(path)}
  primaryContent={
    <>
      <GoabxWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabxWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      <GoabxWorkSideMenuItem icon="document" label="Reports" url="/reports" />
      <GoabxWorkSideMenuItem icon="settings" label="Admin" url="/admin" />
    </>
  }
/>`,
        angular: `<goabx-work-side-menu heading="My Application" url="/" (onNavigate)="handleNavigate($event)">
  <div slot="primary-content">
    <goabx-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goabx-work-side-menu-item>
    <goabx-work-side-menu-item icon="list" label="Cases" url="/cases"></goabx-work-side-menu-item>
    <goabx-work-side-menu-item icon="document" label="Reports" url="/reports"></goabx-work-side-menu-item>
    <goabx-work-side-menu-item icon="settings" label="Admin" url="/admin"></goabx-work-side-menu-item>
  </div>
</goabx-work-side-menu>`,
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
<GoabxWorkSideMenu
  heading="My Application"
  url="/"
  open={true}
  onNavigate={(path: string) => navigate(path)}
  primaryContent={
    <>
      <GoabxWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabxWorkSideMenuGroup  icon="document" heading="Documents" open={true} >
        <GoabxWorkSideMenuItem label="Invoices" url="/documents/invoices" />
        <GoabxWorkSideMenuItem label="Contracts" url="/documents/contracts" />
        <GoabxWorkSideMenuItem label="Reports" url="/documents/reports" />
      </GoabxWorkSideMenuGroup>
      <GoabxWorkSideMenuItem icon="list" label="Cases" url="/cases" />
    </>
  }
/>
        `,
        angular: `
<goabx-work-side-menu
  heading="My Application"
  url="/"
  [primaryContent]="primaryTemplate"
  [open]="true"
  (onNavigate)="handleNavigate($event)"
>
  <ng-template #primaryTemplate>
    <goabx-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard" />
    <goabx-work-side-menu-group icon="document" heading="Documents" [open]="true">
      <goabx-work-side-menu-item label="Invoices" url="/documents/invoices" />
      <goabx-work-side-menu-item label="Contracts" url="/documents/contracts" />
      <goabx-work-side-menu-item label="Reports" url="/documents/reports" />
    </goabx-work-side-menu-group>
    <goabx-work-side-menu-item icon="list" label="Cases" url="/cases" />
  </ng-template>
</goabx-work-side-menu>
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
  ],
};
