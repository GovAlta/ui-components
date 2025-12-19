/**
 * Grid Component Configurations
 *
 * Grid creates responsive multi-column layouts.
 */

import type { ComponentConfigurations } from './types';

export const gridConfigurations: ComponentConfigurations = {
  componentSlug: 'grid',
  componentName: 'Grid',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic grid',
      description: 'Simple multi-column grid',
      code: {
        react: `<GoabGrid minChildWidth="200px" gap="m">
  <GoabContainer>Item 1</GoabContainer>
  <GoabContainer>Item 2</GoabContainer>
  <GoabContainer>Item 3</GoabContainer>
</GoabGrid>`,
        angular: `<goab-grid minChildWidth="200px" gap="m">
  <goab-container>Item 1</goab-container>
  <goab-container>Item 2</goab-container>
  <goab-container>Item 3</goab-container>
</goab-grid>`,
        webComponents: `<goa-grid minchildwidth="200px" gap="m">
  <goa-container>Item 1</goa-container>
  <goa-container>Item 2</goa-container>
  <goa-container>Item 3</goa-container>
</goa-grid>`,
      },
    },
    {
      id: 'gap-sizes',
      name: 'Gap sizes',
      description: 'Different spacing between items',
      code: {
        react: `<GoabGrid minChildWidth="150px" gap="xs">
  <GoabContainer>Item 1</GoabContainer>
  <GoabContainer>Item 2</GoabContainer>
</GoabGrid>
<GoabGrid minChildWidth="150px" gap="m">
  <GoabContainer>Item 1</GoabContainer>
  <GoabContainer>Item 2</GoabContainer>
</GoabGrid>
<GoabGrid minChildWidth="150px" gap="xl">
  <GoabContainer>Item 1</GoabContainer>
  <GoabContainer>Item 2</GoabContainer>
</GoabGrid>`,
        angular: `<goab-grid minChildWidth="150px" gap="xs">
  <goab-container>Item 1</goab-container>
  <goab-container>Item 2</goab-container>
</goab-grid>
<goab-grid minChildWidth="150px" gap="m">
  <goab-container>Item 1</goab-container>
  <goab-container>Item 2</goab-container>
</goab-grid>
<goab-grid minChildWidth="150px" gap="xl">
  <goab-container>Item 1</goab-container>
  <goab-container>Item 2</goab-container>
</goab-grid>`,
        webComponents: `<goa-grid minchildwidth="150px" gap="xs">
  <goa-container>Item 1</goa-container>
  <goa-container>Item 2</goa-container>
</goa-grid>
<goa-grid minchildwidth="150px" gap="m">
  <goa-container>Item 1</goa-container>
  <goa-container>Item 2</goa-container>
</goa-grid>
<goa-grid minchildwidth="150px" gap="xl">
  <goa-container>Item 1</goa-container>
  <goa-container>Item 2</goa-container>
</goa-grid>`,
      },
    },
  ],
};
