/**
 * Tab Component Configurations
 *
 * Tab is a child component of Tabs.
 */

import type { ComponentConfigurations } from './types';

export const tabConfigurations: ComponentConfigurations = {
  componentSlug: 'tab',
  componentName: 'Tab',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic tab',
      description: 'Single tab within Tabs component',
      code: {
        react: `<GoabxTabs>
  <GoabTab heading="First tab">
    Content for the first tab.
  </GoabTab>
  <GoabTab heading="Second tab">
    Content for the second tab.
  </GoabTab>
</GoabxTabs>`,
        angular: `<goab-tabs>
  <goab-tab heading="First tab">
    Content for the first tab.
  </goab-tab>
  <goab-tab heading="Second tab">
    Content for the second tab.
  </goab-tab>
</goab-tabs>`,
        webComponents: `<goa-tabs>
  <goa-tab heading="First tab">
    Content for the first tab.
  </goa-tab>
  <goa-tab heading="Second tab">
    Content for the second tab.
  </goa-tab>
</goa-tabs>`,
      },
    },
  ],
};
