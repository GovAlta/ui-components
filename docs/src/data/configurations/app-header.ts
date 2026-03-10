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
        react: `<GoabxAppHeader heading="My Application" />`,
        angular: `<goabx-app-header heading="My Application"></goabx-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application"></goa-app-header>`,
      },
    },
    {
      id: "with-url",
      name: "With home link",
      description: "Header with clickable logo linking to home",
      code: {
        react: `<GoabxAppHeader heading="My Application" url="/" />`,
        angular: `<goabx-app-header heading="My Application" url="/"></goabx-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application" url="/"></goa-app-header>`,
      },
    },
    {
      id: "with-secondary-text",
      name: "With secondary text",
      description: "Header with secondary text below the service name",
      code: {
        react: `<GoabxAppHeader heading="My Application" secondaryText="Supporting information" url="/" />`,
        angular: `<goabx-app-header heading="My Application" secondaryText="Supporting information" url="/"></goabx-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application" secondarytext="Supporting information" url="/"></goa-app-header>`,
      },
    },
    {
      id: "with-utilities",
      name: "With utilities",
      description: "Header with utility actions",
      code: {
        react: `<GoabxAppHeader heading="My Application" url="/">
  <GoabxButton slot="utilities" type="tertiary" size="compact">Help</GoabxButton>
  <GoabxButton slot="utilities" type="tertiary" size="compact" leadingIcon="person">Sign in</GoabxButton>
</GoabxAppHeader>`,
        angular: `<goabx-app-header heading="My Application" url="/">
  <goabx-button slot="utilities" type="tertiary" size="compact">Help</goabx-button>
  <goabx-button slot="utilities" type="tertiary" size="compact" leadingIcon="person">Sign in</goabx-button>
</goabx-app-header>`,
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
        react: `<GoabxAppHeader heading="My Application" url="/">
  <GoabxBadge slot="phase" type="important" content="Service preview" icon={false} />
</GoabxAppHeader>`,
        angular: `<goabx-app-header heading="My Application" url="/">
  <goabx-badge slot="phase" type="important" content="Service preview" [icon]="false"></goabx-badge>
</goabx-app-header>`,
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
        react: `<GoabxAppHeader heading="My Application" url="/">
  <span slot="banner" style={{textAlign: "right", width: "100%", fontSize: "12px", fontWeight: "normal"}}>v2.3.1 | UAT Environment</span>
</GoabxAppHeader>`,
        angular: `<goabx-app-header heading="My Application" url="/">
  <span slot="banner" style="text-align: right; width: 100%; font-size: 12px; font-weight: normal">v2.3.1 | UAT Environment</span>
</goabx-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application" url="/">
  <span slot="banner" style="text-align: right; width: 100%; font-size: 12px; font-weight: normal">v2.3.1 | UAT Environment</span>
</goa-app-header>`,
      },
    },
    {
      id: "full-example",
      name: "Full example",
      description: "Header with navigation and utilities",
      code: {
        react: `<GoabxAppHeader heading="Service Portal" url="/">
  <a slot="navigation" href="/dashboard">Dashboard</a>
  <a slot="navigation" href="/applications">Applications</a>
  <a slot="navigation" href="/settings">Settings</a>
  <GoabxMenuButton slot="utilities" text="John Smith" type="tertiary" size="compact">
    <GoabxMenuAction text="User settings" action="user-settings" />
    <GoabxMenuAction text="Sign out" action="sign-out" />
  </GoabxMenuButton>
</GoabxAppHeader>`,
        angular: `<goabx-app-header heading="Service Portal" url="/">
  <a slot="navigation" href="/dashboard">Dashboard</a>
  <a slot="navigation" href="/applications">Applications</a>
  <a slot="navigation" href="/settings">Settings</a>
  <goabx-menu-button slot="utilities" text="John Smith" type="tertiary" size="compact">
    <goabx-menu-action text="User settings" action="user-settings"></goabx-menu-action>
    <goabx-menu-action text="Sign out" action="sign-out"></goabx-menu-action>
  </goabx-menu-button>
</goabx-app-header>`,
        webComponents: `<goa-app-header version="2" heading="Service Portal" url="/">
  <a slot="navigation" href="/dashboard">Dashboard</a>
  <a slot="navigation" href="/applications">Applications</a>
  <a slot="navigation" href="/settings">Settings</a>
  <goa-menu-button slot="utilities" version="2" text="John Smith" type="tertiary" size="compact">
    <goa-menu-action text="User settings" action="user-settings"></goa-menu-action>
    <goa-menu-action text="Sign out" action="sign-out"></goa-menu-action>
  </goa-menu-button>
</goa-app-header>`,
      },
    },
  ],
};
