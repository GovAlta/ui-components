/**
 * Pages Component Configurations
 *
 * Pages provides page layout structure.
 */

import type { ComponentConfigurations } from './types';

export const pagesConfigurations: ComponentConfigurations = {
  componentSlug: 'pages',
  componentName: 'Pages',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic pages layout',
      description: 'Standard page structure',
      code: {
        react: `<GoabPages>
  <GoabPageBlock>
    <h1>Page Title</h1>
    <p>Main page content goes here.</p>
  </GoabPageBlock>
</GoabPages>`,
        angular: `<goab-pages>
  <goab-page-block>
    <h1>Page Title</h1>
    <p>Main page content goes here.</p>
  </goab-page-block>
</goab-pages>`,
        webComponents: `<goa-pages>
  <goa-page-block>
    <h1>Page Title</h1>
    <p>Main page content goes here.</p>
  </goa-page-block>
</goa-pages>`,
      },
    },
  ],
};
