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
        react: `<GoabxSideMenu>
  <GoabxSideMenuHeading>Main Menu</GoabxSideMenuHeading>
  <a href="/dashboard">Dashboard</a>
  <a href="/reports">Reports</a>
  <GoabxSideMenuHeading>Settings</GoabxSideMenuHeading>
  <a href="/profile">Profile</a>
  <a href="/preferences">Preferences</a>
</GoabxSideMenu>`,
        angular: `<goabx-side-menu>
  <goabx-side-menu-heading>Main Menu</goabx-side-menu-heading>
  <a href="/dashboard">Dashboard</a>
  <a href="/reports">Reports</a>
  <goabx-side-menu-heading>Settings</goabx-side-menu-heading>
  <a href="/profile">Profile</a>
  <a href="/preferences">Preferences</a>
</goabx-side-menu>`,
        webComponents: `<goa-side-menu version="2">
  <goa-side-menu-heading version="2">Main Menu</goa-side-menu-heading>
  <a href="/dashboard">Dashboard</a>
  <a href="/reports">Reports</a>
  <goa-side-menu-heading version="2">Settings</goa-side-menu-heading>
  <a href="/profile">Profile</a>
  <a href="/preferences">Preferences</a>
</goa-side-menu>`,
      },
    },
  ],
};
