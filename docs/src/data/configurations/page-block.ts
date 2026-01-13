/**
 * PageBlock Component Configurations
 *
 * PageBlock provides consistent page layout structure.
 */

import type { ComponentConfigurations } from './types';

export const pageBlockConfigurations: ComponentConfigurations = {
  componentSlug: 'page-block',
  componentName: 'Page block',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic page block',
      description: 'Standard page content wrapper',
      code: {
        react: `<GoabPageBlock>
  <h1>Page Title</h1>
  <p>Page content goes here.</p>
</GoabPageBlock>`,
        angular: `<goab-page-block>
  <h1>Page Title</h1>
  <p>Page content goes here.</p>
</goab-page-block>`,
        webComponents: `<goa-page-block>
  <h1>Page Title</h1>
  <p>Page content goes here.</p>
</goa-page-block>`,
      },
    },
    {
      id: 'width-options',
      name: 'Width options',
      description: 'Different content widths',
      code: {
        react: `<GoabPageBlock width="full">
  <p>Full width content</p>
</GoabPageBlock>
<GoabPageBlock width="narrow">
  <p>Narrow width content</p>
</GoabPageBlock>`,
        angular: `<goab-page-block width="full">
  <p>Full width content</p>
</goab-page-block>
<goab-page-block width="narrow">
  <p>Narrow width content</p>
</goab-page-block>`,
        webComponents: `<goa-page-block width="full">
  <p>Full width content</p>
</goa-page-block>
<goa-page-block width="narrow">
  <p>Narrow width content</p>
</goa-page-block>`,
      },
    },
  ],
};
