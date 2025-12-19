/**
 * Divider Component Configurations
 *
 * Dividers separate content sections visually.
 */

import type { ComponentConfigurations } from './types';

export const dividerConfigurations: ComponentConfigurations = {
  componentSlug: 'divider',
  componentName: 'Divider',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic divider',
      description: 'Simple horizontal line',
      code: {
        react: `<p>Section one content</p>
<GoabDivider />
<p>Section two content</p>`,
        angular: `<p>Section one content</p>
<goab-divider></goab-divider>
<p>Section two content</p>`,
        webComponents: `<p>Section one content</p>
<goa-divider></goa-divider>
<p>Section two content</p>`,
      },
    },
    {
      id: 'with-margins',
      name: 'With margins',
      description: 'Divider with custom spacing',
      code: {
        react: `<p>Section one</p>
<GoabDivider mt="xl" mb="xl" />
<p>Section two</p>`,
        angular: `<p>Section one</p>
<goab-divider mt="xl" mb="xl"></goab-divider>
<p>Section two</p>`,
        webComponents: `<p>Section one</p>
<goa-divider mt="xl" mb="xl"></goa-divider>
<p>Section two</p>`,
      },
    },
  ],
};
