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
  <GoabxSideMenu heading="My Application" url="/">
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </GoabxSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goabx-side-menu heading="My Application" url="/">
    <a href="/overview">Overview</a>
    <a href="/details">Details</a>
    <a href="/settings">Settings</a>
  </goabx-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu version="2" heading="My Application" url="/">
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
  <GoabxSideMenu heading="My Application" url="/">
    <GoabxSideMenuHeading>Main</GoabxSideMenuHeading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <GoabxSideMenuHeading>Settings</GoabxSideMenuHeading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </GoabxSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goabx-side-menu heading="My Application" url="/">
    <goabx-side-menu-heading>Main</goabx-side-menu-heading>
    <a href="/dashboard">Dashboard</a>
    <a href="/reports">Reports</a>
    <goabx-side-menu-heading>Settings</goabx-side-menu-heading>
    <a href="/profile">Profile</a>
    <a href="/preferences">Preferences</a>
  </goabx-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu version="2" heading="My Application" url="/">
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
      id: 'with-expandable-groups',
      name: 'Expandable groups',
      description: 'Collapsible menu sections',
      code: {
        react: `<div style={{ width: '200px' }}>
  <GoabxSideMenu heading="My Application" url="/">
    <GoabxSideMenuGroup heading="Applications">
      <a href="/apps/active">Active</a>
      <a href="/apps/pending">Pending</a>
      <a href="/apps/archived">Archived</a>
    </GoabxSideMenuGroup>
    <GoabxSideMenuGroup heading="Reports">
      <a href="/reports/monthly">Monthly</a>
      <a href="/reports/annual">Annual</a>
    </GoabxSideMenuGroup>
  </GoabxSideMenu>
</div>`,
        angular: `<div style="width: 200px">
  <goabx-side-menu heading="My Application" url="/">
    <goabx-side-menu-group heading="Applications">
      <a href="/apps/active">Active</a>
      <a href="/apps/pending">Pending</a>
      <a href="/apps/archived">Archived</a>
    </goabx-side-menu-group>
    <goabx-side-menu-group heading="Reports">
      <a href="/reports/monthly">Monthly</a>
      <a href="/reports/annual">Annual</a>
    </goabx-side-menu-group>
  </goabx-side-menu>
</div>`,
        webComponents: `<div style="width: 200px">
  <goa-side-menu version="2" heading="My Application" url="/">
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
