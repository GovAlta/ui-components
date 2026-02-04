/**
 * Link Component Configurations
 *
 * Links navigate users to other pages or resources.
 */

import type { ComponentConfigurations } from './types';

export const linkConfigurations: ComponentConfigurations = {
  componentSlug: 'link',
  componentName: 'Link',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic link',
      description: 'Simple text link',
      code: {
        react: `<GoabxLink href="/about">Learn more about our services</GoabxLink>`,
        angular: `<goab-link href="/about">Learn more about our services</goab-link>`,
        webComponents: `<goa-link href="/about">Learn more about our services</goa-link>`,
      },
    },
    {
      id: 'external',
      name: 'External link',
      description: 'Link to external website (icon added automatically)',
      code: {
        react: `<GoabxLink href="https://www.alberta.ca">
  Visit Alberta.ca
</GoabxLink>`,
        angular: `<goab-link href="https://www.alberta.ca">
  Visit Alberta.ca
</goab-link>`,
        webComponents: `<goa-link href="https://www.alberta.ca">
  Visit Alberta.ca
</goa-link>`,
      },
    },
    {
      id: 'inverted',
      name: 'Inverted',
      description: 'Link for dark backgrounds',
      code: {
        react: `<div style={{ backgroundColor: '#333', padding: '1rem' }}>
  <GoabxLink href="/contact" color="light">Contact us</GoabxLink>
</div>`,
        angular: `<div style="background-color: #333; padding: 1rem">
  <goab-link href="/contact" color="light">Contact us</goab-link>
</div>`,
        webComponents: `<div style="background-color: #333; padding: 1rem">
  <goa-link href="/contact" color="light">Contact us</goa-link>
</div>`,
      },
    },
    {
      id: 'with-leading-icon',
      name: 'With leading icon',
      description: 'Link with an icon before text',
      code: {
        react: `<GoabxLink href="/download" leadingIcon="download">
  Download form
</GoabxLink>`,
        angular: `<goab-link href="/download" leadingIcon="download">
  Download form
</goab-link>`,
        webComponents: `<goa-link href="/download" leadingicon="download">
  Download form
</goa-link>`,
      },
    },
    {
      id: 'with-trailing-icon',
      name: 'With trailing icon',
      description: 'Link with an icon after text',
      code: {
        react: `<GoabxLink href="/next" trailingIcon="arrow-forward">
  Continue to next step
</GoabxLink>`,
        angular: `<goab-link href="/next" trailingIcon="arrow-forward">
  Continue to next step
</goab-link>`,
        webComponents: `<goa-link href="/next" trailingicon="arrow-forward">
  Continue to next step
</goa-link>`,
      },
    },
  ],
};
