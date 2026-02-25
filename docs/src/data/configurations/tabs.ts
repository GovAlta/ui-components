/**
 * Tabs Component Configurations
 *
 * Tabs organize content into separate views.
 */

import type { ComponentConfigurations } from "./types";

export const tabsConfigurations: ComponentConfigurations = {
  componentSlug: "tabs",
  componentName: "Tabs",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic tabs",
      description: "Simple tab navigation",
      code: {
        react: `<GoabxTabs initialTab={1}>
  <GoabTab heading="Overview">
    <p>Overview content goes here.</p>
  </GoabTab>
  <GoabTab heading="Details">
    <p>Detailed information goes here.</p>
  </GoabTab>
  <GoabTab heading="History">
    <p>Historical data goes here.</p>
  </GoabTab>
</GoabxTabs>`,
        angular: `<goabx-tabs [initialTab]="1">
  <goab-tab heading="Overview">
    <p>Overview content goes here.</p>
  </goab-tab>
  <goab-tab heading="Details">
    <p>Detailed information goes here.</p>
  </goab-tab>
  <goab-tab heading="History">
    <p>Historical data goes here.</p>
  </goab-tab>
</goabx-tabs>`,
        webComponents: `<goa-tabs version="2" initialtab="1">
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
      id: "initial-tab",
      name: "Initial tab",
      description: "Start with a specific tab selected",
      code: {
        react: `<GoabxTabs initialTab={2}>
  <GoabTab heading="First">First tab content.</GoabTab>
  <GoabTab heading="Second">Second tab content (initially shown).</GoabTab>
  <GoabTab heading="Third">Third tab content.</GoabTab>
</GoabxTabs>`,
        angular: `<goabx-tabs [initialTab]="2">
  <goab-tab heading="First">First tab content.</goab-tab>
  <goab-tab heading="Second">Second tab content (initially shown).</goab-tab>
  <goab-tab heading="Third">Third tab content.</goab-tab>
</goabx-tabs>`,
        webComponents: `<goa-tabs version="2" initialtab="2">
  <goa-tab heading="First">First tab content.</goa-tab>
  <goa-tab heading="Second">Second tab content (initially shown).</goa-tab>
  <goa-tab heading="Third">Third tab content.</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: "segmented",
      name: "Segmented variant",
      description: "Pill/button style tabs",
      code: {
        react: `<GoabxTabs variant="segmented">
  <GoabTab heading="Day">Daily view</GoabTab>
  <GoabTab heading="Week">Weekly view</GoabTab>
  <GoabTab heading="Month">Monthly view</GoabTab>
</GoabxTabs>`,
        angular: `<goabx-tabs variant="segmented">
  <goab-tab heading="Day">Daily view</goab-tab>
  <goab-tab heading="Week">Weekly view</goab-tab>
  <goab-tab heading="Month">Monthly view</goab-tab>
</goabx-tabs>`,
        webComponents: `<goa-tabs version="2" variant="segmented">
  <goa-tab heading="Day">Daily view</goa-tab>
  <goa-tab heading="Week">Weekly view</goa-tab>
  <goa-tab heading="Month">Monthly view</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: "no-url-update",
      name: "Without URL update",
      description: "Tabs that do not update browser URL",
      code: {
        react: `<GoabxTabs initialTab={1} updateUrl={false}>
  <GoabTab heading="Settings">Settings panel</GoabTab>
  <GoabTab heading="Preferences">Preferences panel</GoabTab>
</GoabxTabs>`,
        angular: `<goabx-tabs [initialTab]="1" [updateUrl]="false">
  <goab-tab heading="Settings">Settings panel</goab-tab>
  <goab-tab heading="Preferences">Preferences panel</goab-tab>
</goabx-tabs>`,
        webComponents: `<goa-tabs version="2" initialtab="1" updateurl="false">
  <goa-tab heading="Settings">Settings panel</goa-tab>
  <goa-tab heading="Preferences">Preferences panel</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: "horizontal-on-mobile",
      name: "Horizontal on mobile",
      description: "Tabs stay horizontal on small screens",
      code: {
        react: `<GoabxTabs initialTab={1} orientation="horizontal">
  <GoabxTab heading="Tab 1">Content 1</GoabxTab>
  <GoabxTab heading="Tab 2">Content 2</GoabxTab>
  <GoabxTab heading="Tab 3">Content 3</GoabxTab>
</GoabxTabs>`,
        angular: `<goabx-tabs [initialTab]="1" orientation="horizontal">
  <goabx-tab heading="Tab 1">Content 1</goabx-tab>
  <goabx-tab heading="Tab 2">Content 2</goabx-tab>
  <goabx-tab heading="Tab 3">Content 3</goabx-tab>
</goabx-tabs>`,
        webComponents: `<goa-tabs initialtab="1" orientation="horizontal">
  <goa-tab heading="Tab 1">Content 1</goa-tab>
  <goa-tab heading="Tab 2">Content 2</goa-tab>
  <goa-tab heading="Tab 3">Content 3</goa-tab>
</goa-tabs>`,
      },
    },
  ],
};
