/**
 * AppHeaderMenu Component Configurations
 *
 * AppHeaderMenu is a child component of AppHeader.
 */

import type { ComponentConfigurations } from "./types";

export const appHeaderMenuConfigurations: ComponentConfigurations = {
  componentSlug: "app-header-menu",
  componentName: "App header menu",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic app header menu",
      description: "Navigation menu within AppHeader",
      code: {
        react: `<GoabAppHeader heading="My Application">
  <GoabAppHeaderMenu slotName="navigation" heading="Menu">
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <a href="/settings">Settings</a>
  </GoabAppHeaderMenu>
</GoabAppHeader>`,
        angular: `<goab-app-header heading="My Application">
  <goab-app-header-menu slot="navigation" heading="Menu">
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <a href="/settings">Settings</a>
  </goab-app-header-menu>
</goab-app-header>`,
        webComponents: `<goa-app-header version="2" heading="My Application">
  <goa-app-header-menu slot="navigation" version="2" heading="Menu">
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <a href="/settings">Settings</a>
  </goa-app-header-menu>
</goa-app-header>`,
      },
    },
  ],
};
