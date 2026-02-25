/**
 * AppHeader Component Configurations
 *
 * App header provides main navigation for applications.
 */

import type { ComponentConfigurations } from './types';

export const appHeaderConfigurations: ComponentConfigurations = {
  componentSlug: 'app-header',
  componentName: 'App header',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic app header',
      description: 'Simple application header',
      code: {
        react: `<GoabAppHeader heading="My Application" />`,
        angular: `<goab-app-header heading="My Application"></goab-app-header>`,
        webComponents: `<goa-app-header heading="My Application"></goa-app-header>`,
      },
    },
    {
      id: 'with-url',
      name: 'With home link',
      description: 'Header with clickable title',
      code: {
        react: `<GoabAppHeader heading="My Application" url="/" />`,
        angular: `<goab-app-header heading="My Application" url="/"></goab-app-header>`,
        webComponents: `<goa-app-header heading="My Application" url="/"></goa-app-header>`,
      },
    },
    {
      id: 'with-actions',
      name: 'With actions',
      description: 'Header with action buttons',
      code: {
        react: `<GoabAppHeader heading="My Application" url="/">
  <div slot="actions">
    <GoabxButton type="tertiary">Help</GoabxButton>
    <GoabxButton type="tertiary">Sign out</GoabxButton>
  </div>
</GoabAppHeader>`,
        angular: `<goab-app-header heading="My Application" url="/">
  <div slot="actions">
    <goabx-button type="tertiary">Help</goabx-button>
    <goabx-button type="tertiary">Sign out</goabx-button>
  </div>
</goab-app-header>`,
        webComponents: `<goa-app-header heading="My Application" url="/">
  <div slot="actions">
    <goa-button version="2" type="tertiary">Help</goa-button>
    <goa-button version="2" type="tertiary">Sign out</goa-button>
  </div>
</goa-app-header>`,
      },
    },
    {
      id: 'full-example',
      name: 'Full example',
      description: 'Header with navigation and actions',
      code: {
        react: `<GoabAppHeader heading="Service Portal" url="/">
  <GoabAppHeaderMenu slot="nav">
    <a href="/dashboard">Dashboard</a>
    <a href="/applications">Applications</a>
    <a href="/settings">Settings</a>
  </GoabAppHeaderMenu>
  <div slot="actions">
    <GoabxButton type="tertiary" leadingIcon="person">John Smith</GoabxButton>
  </div>
</GoabAppHeader>`,
        angular: `<goab-app-header heading="Service Portal" url="/">
  <goab-app-header-menu slot="nav">
    <a href="/dashboard">Dashboard</a>
    <a href="/applications">Applications</a>
    <a href="/settings">Settings</a>
  </goab-app-header-menu>
  <div slot="actions">
    <goabx-button type="tertiary" leadingIcon="person">John Smith</goabx-button>
  </div>
</goab-app-header>`,
        webComponents: `<goa-app-header heading="Service Portal" url="/">
  <goa-app-header-menu slot="nav">
    <a href="/dashboard">Dashboard</a>
    <a href="/applications">Applications</a>
    <a href="/settings">Settings</a>
  </goa-app-header-menu>
  <div slot="actions">
    <goa-button version="2" type="tertiary" leadingicon="person">John Smith</goa-button>
  </div>
</goa-app-header>`,
      },
    },
  ],
};
