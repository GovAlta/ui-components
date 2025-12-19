/**
 * Tabs Component Configurations
 *
 * Tabs organize content into separate views.
 */

import type { ComponentConfigurations } from './types';

export const tabsConfigurations: ComponentConfigurations = {
  componentSlug: 'tabs',
  componentName: 'Tabs',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic tabs',
      description: 'Simple tab navigation',
      code: {
        react: `<GoabTabs initialTab={1}>
  <GoabTab heading="Overview">
    <p>Overview content goes here.</p>
  </GoabTab>
  <GoabTab heading="Details">
    <p>Detailed information goes here.</p>
  </GoabTab>
  <GoabTab heading="History">
    <p>Historical data goes here.</p>
  </GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs [initialTab]="1">
  <goab-tab heading="Overview">
    <p>Overview content goes here.</p>
  </goab-tab>
  <goab-tab heading="Details">
    <p>Detailed information goes here.</p>
  </goab-tab>
  <goab-tab heading="History">
    <p>Historical data goes here.</p>
  </goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs initialtab="1">
  <goa-tab heading="Overview">
    <p>Overview content goes here.</p>
  </goa-tab>
  <goa-tab heading="Details">
    <p>Detailed information goes here.</p>
  </goa-tab>
  <goa-tab heading="History">
    <p>Historical data goes here.</p>
  </goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: 'initial-tab',
      name: 'Initial tab',
      description: 'Start with a specific tab selected',
      code: {
        react: `<GoabTabs initialTab={2}>
  <GoabTab heading="First">First tab content.</GoabTab>
  <GoabTab heading="Second">Second tab content (initially shown).</GoabTab>
  <GoabTab heading="Third">Third tab content.</GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs [initialTab]="2">
  <goab-tab heading="First">First tab content.</goab-tab>
  <goab-tab heading="Second">Second tab content (initially shown).</goab-tab>
  <goab-tab heading="Third">Third tab content.</goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs initialtab="2">
  <goa-tab heading="First">First tab content.</goa-tab>
  <goa-tab heading="Second">Second tab content (initially shown).</goa-tab>
  <goa-tab heading="Third">Third tab content.</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: 'segmented',
      name: 'Segmented variant',
      description: 'Pill/button style tabs',
      code: {
        react: `<GoabTabs variant="segmented">
  <GoabTab heading="Day">Daily view</GoabTab>
  <GoabTab heading="Week">Weekly view</GoabTab>
  <GoabTab heading="Month">Monthly view</GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs variant="segmented">
  <goab-tab heading="Day">Daily view</goab-tab>
  <goab-tab heading="Week">Weekly view</goab-tab>
  <goab-tab heading="Month">Monthly view</goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs variant="segmented">
  <goa-tab heading="Day">Daily view</goa-tab>
  <goa-tab heading="Week">Weekly view</goa-tab>
  <goa-tab heading="Month">Monthly view</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: 'no-url-update',
      name: 'Without URL update',
      description: 'Tabs that do not update browser URL',
      code: {
        react: `<GoabTabs initialTab={1} updateUrl={false}>
  <GoabTab heading="Settings">Settings panel</GoabTab>
  <GoabTab heading="Preferences">Preferences panel</GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs [initialTab]="1" [updateUrl]="false">
  <goab-tab heading="Settings">Settings panel</goab-tab>
  <goab-tab heading="Preferences">Preferences panel</goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs initialtab="1" updateurl="false">
  <goa-tab heading="Settings">Settings panel</goa-tab>
  <goa-tab heading="Preferences">Preferences panel</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: 'no-stack-mobile',
      name: 'Horizontal on mobile',
      description: 'Tabs stay horizontal on small screens',
      code: {
        react: `<GoabTabs initialTab={1} stackOnMobile={false}>
  <GoabTab heading="Tab 1">Content 1</GoabTab>
  <GoabTab heading="Tab 2">Content 2</GoabTab>
  <GoabTab heading="Tab 3">Content 3</GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs [initialTab]="1" [stackOnMobile]="false">
  <goab-tab heading="Tab 1">Content 1</goab-tab>
  <goab-tab heading="Tab 2">Content 2</goab-tab>
  <goab-tab heading="Tab 3">Content 3</goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs initialtab="1" stackonmobile="false">
  <goa-tab heading="Tab 1">Content 1</goa-tab>
  <goa-tab heading="Tab 2">Content 2</goa-tab>
  <goa-tab heading="Tab 3">Content 3</goa-tab>
</goa-tabs>`,
      },
    },
  ],
};
