/**
 * SideMenu Component Configurations
 *
 * Side menu provides vertical navigation.
 */

import type { ComponentConfigurations } from './types';

export const sideMenuConfigurations: ComponentConfigurations = {
  componentSlug: 'side-menu',
  componentName: 'Side menu',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic side menu',
      description: 'Simple navigation menu',
      code: {
        react: `<div style={{ width: '200px' }}>
  <GoabSideMenu heading="My Application" url="/">
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </GoabSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goab-side-menu heading="My Application" url="/">
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </goab-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu heading="My Application" url="/">
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </goa-side-menu>
</div>`,
      },
    },
    {
      id: 'with-groups',
      name: 'With groups',
      description: 'Menu items organized into groups',
      code: {
        react: `<div style={{ width: '200px' }}>
  <GoabSideMenu heading="My Application" url="/">
    <GoabSideMenuHeading>Main</GoabSideMenuHeading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <GoabSideMenuHeading>Settings</GoabSideMenuHeading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </GoabSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goab-side-menu heading="My Application" url="/">
    <goab-side-menu-heading>Main</goab-side-menu-heading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <goab-side-menu-heading>Settings</goab-side-menu-heading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </goab-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu heading="My Application" url="/">
    <goa-side-menu-heading>Main</goa-side-menu-heading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <goa-side-menu-heading>Settings</goa-side-menu-heading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </goa-side-menu>
</div>`,
      },
    },
    {
      id: 'with-expandable-groups',
      name: 'Expandable groups',
      description: 'Collapsible menu sections',
      code: {
        react: `<div style={{ width: '200px' }}>
  <GoabSideMenu heading="My Application" url="/">
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
  <goab-side-menu heading="My Application" url="/">
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
  <goa-side-menu heading="My Application" url="/">
    <goa-side-menu-group heading="Applications">
      <a href="/apps/active">Active</a>
      <a href="/apps/pending">Pending</a>
      <a href="/apps/archived">Archived</a>
    </goa-side-menu-group>
    <goa-side-menu-group heading="Reports">
      <a href="/reports/monthly">Monthly</a>
      <a href="/reports/annual">Annual</a>
    </goa-side-menu-group>
  </goa-side-menu>
</div>`,
      },
    },
  ],
};
