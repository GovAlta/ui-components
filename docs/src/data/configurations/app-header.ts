/**
 * AppHeader Component Configurations
 *
 * App header provides main navigation for applications.
 */

import type { ComponentConfigurations } from "./types";

export const appHeaderConfigurations: ComponentConfigurations = {
  componentSlug: "app-header",
  componentName: "App header",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic app header",
      description: "Simple application header with service name",
      code: {
        react: `<GoabAppHeader heading="My Application" />`,
        angular: `<goab-app-header heading="My Application"></goab-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application"></goa-app-header>`,
      },
    },
    {
      id: "with-url",
      name: "With home link",
      description: "Header with clickable logo linking to home",
      code: {
        react: `<GoabAppHeader heading="My Application" url="/" />`,
        angular: `<goab-app-header heading="My Application" url="/"></goab-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application" url="/"></goa-app-header>`,
      },
    },
    {
      id: "with-secondary-text",
      name: "With secondary text",
      description: "Header with secondary text below the service name",
      code: {
        react: `<GoabAppHeader heading="My Application" secondaryText="Supporting information" url="/" />`,
        angular: `<goab-app-header heading="My Application" secondaryText="Supporting information" url="/"></goab-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application" secondarytext="Supporting information" url="/"></goa-app-header>`,
      },
    },
    {
      id: "with-utilities",
      name: "With utilities",
      description: "Header with utility actions",
      code: {
        react: `<GoabAppHeader
  heading="My Application"
  url="/"
  utilities={
    <>
      <GoabButton type="tertiary" size="compact">
        Help
      </GoabButton>
      <GoabButton type="tertiary" size="compact" leadingIcon="person">
        Sign in
      </GoabButton>
    </>
  }
/>`,
        angular: `<goab-app-header
  heading="My Application"
  url="/"
  [utilities]="utilitiesTemplate1"
></goab-app-header>
<ng-template #utilitiesTemplate1>
  <goab-button type="tertiary" size="compact">Help</goab-button>
  <goab-button type="tertiary" size="compact" leadingIcon="person">Sign in</goab-button>
</ng-template>`,
        webComponents: `<goa-app-header version="2" heading="My Application" url="/">
  <goa-button slot="utilities" version="2" type="tertiary" size="compact">Help</goa-button>
  <goa-button slot="utilities" version="2" type="tertiary" size="compact" leadingicon="person">Sign in</goa-button>
</goa-app-header>`,
      },
    },
    {
      id: "with-phase-badge",
      name: "With phase badge",
      description: "Header with a phase badge indicating service status",
      code: {
        react: `<GoabAppHeader
  heading="My Application"
  url="/"
  phase={<GoabBadge type="important" content="Service preview" />}
/>`,
        angular: `<goab-app-header
  heading="My Application"
  url="/"
  [phase]="phaseTemplate"
></goab-app-header>
<ng-template #phaseTemplate>
  <goab-badge type="important" content="Service preview"></goab-badge>
</ng-template>`,
        webComponents: `<goa-app-header version="2" heading="My Application" url="/">
  <goa-badge slot="phase" version="2" type="important" content="Service preview" icon="false"></goa-badge>
</goa-app-header>`,
      },
    },
    {
      id: "with-banner",
      name: "Internal testing banner",
      description: "Header with a custom banner for environment or version info",
      code: {
        react: `<GoabAppHeader
  heading="My Application"
  url="/"
  banner={
    <span
      style={{
        textAlign: "right",
        width: "100%",
        fontSize: "12px",
        fontWeight: "normal",
      }}
    >
      v2.3.1 | UAT Environment
    </span>
  }
/>`,
        angular: `<goab-app-header
  heading="My Application"
  url="/"
  [banner]="bannerTemplate"
></goab-app-header>
<ng-template #bannerTemplate>
  <span style="text-align: right; width: 100%; font-size: 12px; font-weight: normal"
    >v2.3.1 | UAT Environment</span
  >
</ng-template>`,
        webComponents: `<goa-app-header version="2" heading="My Application" url="/">
  <span slot="banner" style="text-align: right; width: 100%; font-size: 12px; font-weight: normal">v2.3.1 | UAT Environment</span>
</goa-app-header>`,
      },
    },
    {
      id: "with-navigation",
      name: "With navigation",
      description: "Header with navigation, groups, and utilities",
      code: {
        react: `<GoabAppHeader
  heading="Service Portal"
  url="/"
  navigation={
    <>
      <a href="#">Dashboard</a>
      <GoabAppHeaderMenu heading="Applications">
        <a href="#">New application</a>
        <a href="#">Active</a>
        <a href="#">Archived</a>
      </GoabAppHeaderMenu>
      <a href="#">Reports</a>
      <a href="#">Settings</a>
    </>
  }
  utilities={
    <GoabMenuButton text="John Smith" type="tertiary" size="compact">
      <GoabMenuAction text="User settings" action="user-settings" />
      <GoabMenuAction text="Sign out" action="sign-out" />
    </GoabMenuButton>
  }
/>`,
        angular: `<goab-app-header
  heading="Service Portal"
  url="/"
  [navigation]="navigationTemplate"
  [utilities]="utilitiesTemplate2"
></goab-app-header>
<ng-template #navigationTemplate>
  <a href="#">Dashboard</a>
  <goab-app-header-menu heading="Applications">
    <a href="#">New application</a>
    <a href="#">Active</a>
    <a href="#">Archived</a>
  </goab-app-header-menu>
  <a href="#">Reports</a>
  <a href="#">Settings</a>
</ng-template>
<ng-template #utilitiesTemplate2>
  <goab-menu-button text="John Smith" type="tertiary" size="compact">
    <goab-menu-action text="User settings" action="user-settings"></goab-menu-action>
    <goab-menu-action text="Sign out" action="sign-out"></goab-menu-action>
  </goab-menu-button>
</ng-template>`,
        webComponents: `<goa-app-header version="2" heading="Service Portal" url="/">
  <a slot="navigation" href="#">Dashboard</a>
  <goa-app-header-menu slot="navigation" version="2" heading="Applications">
    <a href="#">New application</a>
    <a href="#">Active</a>
    <a href="#">Archived</a>
  </goa-app-header-menu>
  <a slot="navigation" href="#">Reports</a>
  <a slot="navigation" href="#">Settings</a>
  <goa-menu-button slot="utilities" version="2" text="John Smith" type="tertiary" size="compact">
    <goa-menu-action text="User settings" action="user-settings"></goa-menu-action>
    <goa-menu-action text="Sign out" action="sign-out"></goa-menu-action>
  </goa-menu-button>
</goa-app-header>`,
      },
    },
  ],
};
