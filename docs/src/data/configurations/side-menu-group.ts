/**
 * SideMenuGroup Component Configurations
 *
 * SideMenuGroup is a collapsible child component of SideMenu.
 */

import type { ComponentConfigurations } from './types';

export const sideMenuGroupConfigurations: ComponentConfigurations = {
  componentSlug: 'side-menu-group',
  componentName: 'Side menu group',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic side menu group',
      description: 'Collapsible group within SideMenu',
      code: {
        react: `<GoabxSideMenu>
  <GoabxSideMenuGroup heading="Applications">
    <a href="/apps/active">Active</a>
    <a href="/apps/pending">Pending</a>
    <a href="/apps/archived">Archived</a>
  </GoabxSideMenuGroup>
  <GoabxSideMenuGroup heading="Reports">
    <a href="/reports/monthly">Monthly</a>
    <a href="/reports/annual">Annual</a>
  </GoabxSideMenuGroup>
</GoabxSideMenu>`,
        angular: `<goab-side-menu>
  <goab-side-menu-group heading="Applications">
    <a href="/apps/active">Active</a>
    <a href="/apps/pending">Pending</a>
    <a href="/apps/archived">Archived</a>
  </goab-side-menu-group>
  <goab-side-menu-group heading="Reports">
    <a href="/reports/monthly">Monthly</a>
    <a href="/reports/annual">Annual</a>
  </goab-side-menu-group>
</goab-side-menu>`,
        webComponents: `<goa-side-menu>
  <goa-side-menu-group heading="Applications">
    <a href="/apps/active">Active</a>
    <a href="/apps/pending">Pending</a>
    <a href="/apps/archived">Archived</a>
  </goa-side-menu-group>
  <goa-side-menu-group heading="Reports">
    <a href="/reports/monthly">Monthly</a>
    <a href="/reports/annual">Annual</a>
  </goa-side-menu-group>
</goa-side-menu>`,
      },
    },
  ],
};
