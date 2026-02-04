/**
 * WorkSideMenu Component Configurations
 *
 * WorkSideMenu provides navigation for worker applications.
 */

import type { ComponentConfigurations } from './types';

export const workSideMenuConfigurations: ComponentConfigurations = {
  componentSlug: 'work-side-menu',
  componentName: 'Work side menu',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic work side menu',
      description: 'Side navigation for internal apps',
      code: {
        react: `<GoabxWorkSideMenu
  heading="My Application"
  url="/"
  primaryContent={
    <>
      <GoabxWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabxWorkSideMenuItem icon="list" label="Cases" url="/cases" />
      <GoabxWorkSideMenuItem icon="document" label="Reports" url="/reports" />
      <GoabxWorkSideMenuItem icon="settings" label="Admin" url="/admin" />
    </>
  }
/>`,
        angular: `<goab-work-side-menu heading="My Application" url="/">
  <div slot="primary-content">
    <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="document" label="Reports" url="/reports"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="settings" label="Admin" url="/admin"></goab-work-side-menu-item>
  </div>
</goab-work-side-menu>`,
        webComponents: `<goa-work-side-menu heading="My Application" url="/" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="document" label="Reports" url="/reports"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="settings" label="Admin" url="/admin"></goa-work-side-menu-item>
</goa-work-side-menu>`,
      },
    },
    {
      id: 'with-nested-items',
      name: 'With nested items',
      description: 'Work menu with expandable sub-items',
      code: {
        react: `<GoabxWorkSideMenu
  heading="My Application"
  url="/"
  primaryContent={
    <>
      <GoabxWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
      <GoabxWorkSideMenuItem icon="document" label="Documents" url="/documents">
        <GoabxWorkSideMenuItem label="Invoices" url="/documents/invoices" />
        <GoabxWorkSideMenuItem label="Contracts" url="/documents/contracts" />
        <GoabxWorkSideMenuItem label="Reports" url="/documents/reports" />
      </GoabxWorkSideMenuItem>
      <GoabxWorkSideMenuItem icon="list" label="Cases" url="/cases" />
    </>
  }
/>`,
        angular: `<goab-work-side-menu heading="My Application" url="/">
  <div slot="primary-content">
    <goab-work-side-menu-item icon="grid" label="Dashboard" url="/dashboard"></goab-work-side-menu-item>
    <goab-work-side-menu-item icon="document" label="Documents" url="/documents">
      <goab-work-side-menu-item label="Invoices" url="/documents/invoices"></goab-work-side-menu-item>
      <goab-work-side-menu-item label="Contracts" url="/documents/contracts"></goab-work-side-menu-item>
      <goab-work-side-menu-item label="Reports" url="/documents/reports"></goab-work-side-menu-item>
    </goab-work-side-menu-item>
    <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
  </div>
</goab-work-side-menu>`,
        webComponents: `<goa-work-side-menu heading="My Application" url="/" open="true">
  <goa-work-side-menu-item slot="primary" icon="grid" label="Dashboard" url="/dashboard"></goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="document" label="Documents" url="/documents">
    <goa-work-side-menu-item label="Invoices" url="/documents/invoices"></goa-work-side-menu-item>
    <goa-work-side-menu-item label="Contracts" url="/documents/contracts"></goa-work-side-menu-item>
    <goa-work-side-menu-item label="Reports" url="/documents/reports"></goa-work-side-menu-item>
  </goa-work-side-menu-item>
  <goa-work-side-menu-item slot="primary" icon="list" label="Cases" url="/cases"></goa-work-side-menu-item>
</goa-work-side-menu>`,
      },
    },
  ],
};
