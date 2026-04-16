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
      id: "segmented",
      name: "Segmented variant",
      description: "Pill/button style tabs",
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
        webComponents: `<goa-tabs version="2" variant="segmented">
  <goa-tab heading="Day">Daily view</goa-tab>
  <goa-tab heading="Week">Weekly view</goa-tab>
  <goa-tab heading="Month">Monthly view</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: "initial-tab",
      name: "Initial tab",
      description: "Start with a specific tab selected",
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
        webComponents: `<goa-tabs version="2" initialtab="2">
  <goa-tab heading="First">First tab content.</goa-tab>
  <goa-tab heading="Second">Second tab content (initially shown).</goa-tab>
  <goa-tab heading="Third">Third tab content.</goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: "with-badge",
      name: "With badge in heading",
      description: "Tab heading with a badge using the heading slot",
      code: {
        react: `<GoabTabs>
  <GoabTab heading="Messages">
    <GoabText>Your messages will appear here.</GoabText>
  </GoabTab>
  <GoabTab heading={<>Notifications <GoabBadge type="default" emphasis="subtle" icon={false} content="3" /></>}>
    <GoabText>You have 3 unread notifications.</GoabText>
  </GoabTab>
  <GoabTab heading="Settings">
    <GoabText>Manage your preferences.</GoabText>
  </GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs>
  <goab-tab heading="Messages">
    <goab-text>Your messages will appear here.</goab-text>
  </goab-tab>
  <goab-tab [heading]="notifHeadingTpl">
    <ng-template #notifHeadingTpl>Notifications <goab-badge type="default" emphasis="subtle" [icon]="false" content="3"></goab-badge></ng-template>
    <goab-text>You have 3 unread notifications.</goab-text>
  </goab-tab>
  <goab-tab heading="Settings">
    <goab-text>Manage your preferences.</goab-text>
  </goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs version="2">
  <goa-tab heading="Messages">
    <goa-text>Your messages will appear here.</goa-text>
  </goa-tab>
  <goa-tab>
    <span slot="heading">Notifications <goa-badge version="2" type="default" emphasis="subtle" icon="false" content="3"></goa-badge></span>
    <goa-text>You have 3 unread notifications.</goa-text>
  </goa-tab>
  <goa-tab heading="Settings">
    <goa-text>Manage your preferences.</goa-text>
  </goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: "disabled",
      name: "Disabled tab",
      description: "Tab that cannot be selected",
      code: {
        react: `<GoabTabs>
  <GoabTab heading="Active">
    <GoabText>This tab is active.</GoabText>
  </GoabTab>
  <GoabTab heading="Disabled" disabled>
    <GoabText>This content is not accessible.</GoabText>
  </GoabTab>
  <GoabTab heading="Another tab">
    <GoabText>This tab is also available.</GoabText>
  </GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs>
  <goab-tab heading="Active">
    <goab-text>This tab is active.</goab-text>
  </goab-tab>
  <goab-tab heading="Disabled" [disabled]="true">
    <goab-text>This content is not accessible.</goab-text>
  </goab-tab>
  <goab-tab heading="Another tab">
    <goab-text>This tab is also available.</goab-text>
  </goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs version="2">
  <goa-tab heading="Active">
    <goa-text>This tab is active.</goa-text>
  </goa-tab>
  <goa-tab heading="Disabled" disabled>
    <goa-text>This content is not accessible.</goa-text>
  </goa-tab>
  <goa-tab heading="Another tab">
    <goa-text>This tab is also available.</goa-text>
  </goa-tab>
</goa-tabs>`,
      },
    },
    {
      id: "horizontal-on-mobile",
      name: "Horizontal on mobile",
      description: "Tabs stay horizontal on small screens",
      code: {
        react: `<GoabTabs initialTab={1} orientation="horizontal">
  <GoabTab heading="Tab 1">Content 1</GoabTab>
  <GoabTab heading="Tab 2">Content 2</GoabTab>
  <GoabTab heading="Tab 3">Content 3</GoabTab>
</GoabTabs>`,
        angular: `<goab-tabs [initialTab]="1" orientation="horizontal">
  <goab-tab heading="Tab 1">Content 1</goab-tab>
  <goab-tab heading="Tab 2">Content 2</goab-tab>
  <goab-tab heading="Tab 3">Content 3</goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs version="2" initialtab="1" orientation="horizontal">
  <goa-tab heading="Tab 1">Content 1</goa-tab>
  <goa-tab heading="Tab 2">Content 2</goa-tab>
  <goa-tab heading="Tab 3">Content 3</goa-tab>
</goa-tabs>`,
      },
    },
  ],
};
