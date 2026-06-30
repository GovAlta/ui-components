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
        react: `<GoabAppHeader
  heading="My Application"
  navigation={
    <GoabAppHeaderMenu heading="Applications">
      <a href="/dashboard">Dashboard</a>
      <a href="/reports">Reports</a>
      <a href="/settings">Settings</a>
    </GoabAppHeaderMenu>
  }
/>`,
        angular: `<goab-app-header
  heading="My Application"
  [navigation]="navigationTemplate"
></goab-app-header>
<ng-template #navigationTemplate>
  <a href="/dashboard">Dashboard</a>
  <a href="/reports">Reports</a>
  <a href="/settings">Settings</a>
</ng-template>`,
        webComponents: `<goa-app-header version="2" heading="My Application">
  <goa-app-header-menu slot="navigation" heading="Menu">
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <a href="/settings">Settings</a>
  </goa-app-header-menu>
</goa-app-header>`,
      },
    },
  ],
};
