/**
 * SideMenu Component Configurations
 *
 * Side menu provides vertical navigation.
 */

import type { ComponentConfigurations } from "./types";

export const sideMenuConfigurations: ComponentConfigurations = {
  componentSlug: "side-menu",
  componentName: "Side menu",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic side menu",
      description: "Simple navigation menu",
      code: {
        react: `<div style={{ width: '200px' }}>
  <GoabSideMenu>
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </GoabSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goab-side-menu>
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </goab-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu version="2">
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </goa-side-menu>
</div>`,
      },
    },
    {
      id: "with-groups",
      name: "With sections",
      description: "Menu items organized into sections",
      code: {
        react: `<div style={{ width: '200px' }}>
  <GoabSideMenu>
    <GoabSideMenuHeading>Main</GoabSideMenuHeading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <GoabSideMenuHeading>Settings</GoabSideMenuHeading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </GoabSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goab-side-menu>
    <goab-side-menu-heading>Main</goab-side-menu-heading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <goab-side-menu-heading>Settings</goab-side-menu-heading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </goab-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu version="2">
    <goa-side-menu-heading version="2">Main</goa-side-menu-heading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <goa-side-menu-heading version="2">Settings</goa-side-menu-heading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </goa-side-menu>
</div>`,
      },
    },
    {
      id: "with-expandable-groups",
      name: "With groups",
      description: "Collapsible menu groups",
      code: {
        react: `<div style={{ width: '200px' }}>
  <GoabSideMenu>
    <GoabSideMenuGroup heading="Applications">
      <a href="/apps/active">Active</a>
      <a href="/apps/pending">Pending</a>
      <a href="/apps/archived">Archived</a>
    </GoabSideMenuGroup>
    <GoabSideMenuGroup heading="Reports">
      <a href="/reports/monthly">Monthly</a>
      <a href="/reports/annual">Annual</a>
    </GoabSideMenuGroup>
  </GoabSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goab-side-menu>
    <goab-side-menu-group heading="Applications">
      <a href="/apps/active">Active</a>
      <a href="/apps/pending">Pending</a>
      <a href="/apps/archived">Archived</a>
    </goab-side-menu-group>
    <goab-side-menu-group heading="Reports">
      <a href="/reports/monthly">Monthly</a>
      <a href="/reports/annual">Annual</a>
    </goab-side-menu-group>
  </goab-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu version="2">
    <goa-side-menu-group version="2" heading="Applications">
      <a href="/apps/active">Active</a>
      <a href="/apps/pending">Pending</a>
      <a href="/apps/archived">Archived</a>
    </goa-side-menu-group>
    <goa-side-menu-group version="2" heading="Reports">
      <a href="/reports/monthly">Monthly</a>
      <a href="/reports/annual">Annual</a>
    </goa-side-menu-group>
  </goa-side-menu>
</div>`,
      },
    },
  ],
};
