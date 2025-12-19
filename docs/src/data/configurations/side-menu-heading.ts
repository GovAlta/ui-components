/**
 * SideMenuHeading Component Configurations
 *
 * SideMenuHeading is a child component of SideMenu.
 */

import type { ComponentConfigurations } from './types';

export const sideMenuHeadingConfigurations: ComponentConfigurations = {
  componentSlug: 'side-menu-heading',
  componentName: 'Side menu heading',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic side menu heading',
      description: 'Section heading within SideMenu',
      code: {
        react: `<GoabSideMenu>
  <GoabSideMenuHeading>Main Menu</GoabSideMenuHeading>
  <a href="/dashboard">Dashboard</a>
  <a href="/reports">Reports</a>
  <GoabSideMenuHeading>Settings</GoabSideMenuHeading>
  <a href="/profile">Profile</a>
  <a href="/preferences">Preferences</a>
</GoabSideMenu>`,
        angular: `<goab-side-menu>
  <goab-side-menu-heading>Main Menu</goab-side-menu-heading>
  <a href="/dashboard">Dashboard</a>
  <a href="/reports">Reports</a>
  <goab-side-menu-heading>Settings</goab-side-menu-heading>
  <a href="/profile">Profile</a>
  <a href="/preferences">Preferences</a>
</goab-side-menu>`,
        webComponents: `<goa-side-menu>
  <goa-side-menu-heading>Main Menu</goa-side-menu-heading>
  <a href="/dashboard">Dashboard</a>
  <a href="/reports">Reports</a>
  <goa-side-menu-heading>Settings</goa-side-menu-heading>
  <a href="/profile">Profile</a>
  <a href="/preferences">Preferences</a>
</goa-side-menu>`,
      },
    },
  ],
};
