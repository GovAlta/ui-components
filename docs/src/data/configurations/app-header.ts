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
        react: `<GoabAppHeader heading="My Application" url="/">
  <GoabButton slot="utilities" type="tertiary" size="compact">Help</GoabButton>
  <GoabButton slot="utilities" type="tertiary" size="compact" leadingIcon="person">Sign in</GoabButton>
</GoabAppHeader>`,
        angular: `<goab-app-header heading="My Application" url="/">
  <goab-button slot="utilities" type="tertiary" size="compact">Help</goab-button>
  <goab-button slot="utilities" type="tertiary" size="compact" leadingIcon="person">Sign in</goab-button>
</goab-app-header>`,
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
        react: `<GoabAppHeader heading="My Application" url="/">
  <GoabBadge slot="phase" type="important" content="Service preview" icon={false} />
</GoabAppHeader>`,
        angular: `<goab-app-header heading="My Application" url="/">
  <goab-badge slot="phase" type="important" content="Service preview" [icon]="false"></goab-badge>
</goab-app-header>`,
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
        react: `<GoabAppHeader heading="My Application" url="/">
  <span slot="banner" style={{textAlign: "right", width: "100%", fontSize: "12px", fontWeight: "normal"}}>v2.3.1 | UAT Environment</span>
</GoabAppHeader>`,
        angular: `<goab-app-header heading="My Application" url="/">
  <span slot="banner" style="text-align: right; width: 100%; font-size: 12px; font-weight: normal">v2.3.1 | UAT Environment</span>
</goab-app-header>`,
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
        react: `<GoabAppHeader heading="Service Portal" url="/">
  <a slot="navigation" href="/dashboard">Dashboard</a>
  <a slot="navigation" href="/applications">Applications</a>
  <a slot="navigation" href="/settings">Settings</a>
  <GoabMenuButton slot="utilities" text="John Smith" type="tertiary" size="compact">
    <GoabMenuAction text="User settings" action="user-settings" />
    <GoabMenuAction text="Sign out" action="sign-out" />
  </GoabMenuButton>
</GoabAppHeader>`,
        angular: `<goab-app-header heading="Service Portal" url="/">
  <a slot="navigation" href="/dashboard">Dashboard</a>
  <a slot="navigation" href="/applications">Applications</a>
  <a slot="navigation" href="/settings">Settings</a>
  <goab-menu-button slot="utilities" text="John Smith" type="tertiary" size="compact">
    <goab-menu-action text="User settings" action="user-settings"></goab-menu-action>
    <goab-menu-action text="Sign out" action="sign-out"></goab-menu-action>
  </goab-menu-button>
</goab-app-header>`,
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
