/**
 * Block Component Configurations
 *
 * Block provides vertical spacing and horizontal alignment.
 */

import type { ComponentConfigurations } from './types';

export const blockConfigurations: ComponentConfigurations = {
  componentSlug: 'block',
  componentName: 'Block',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic block',
      description: 'Block with default spacing',
      code: {
        react: `<GoabBlock>
  <p>First item</p>
  <p>Second item</p>
  <p>Third item</p>
</GoabBlock>`,
        angular: `<goab-block>
  <p>First item</p>
  <p>Second item</p>
  <p>Third item</p>
</goab-block>`,
        webComponents: `<goa-block>
  <p>First item</p>
  <p>Second item</p>
  <p>Third item</p>
</goa-block>`,
      },
    },
    {
      id: 'gap-sizes',
      name: 'Gap sizes',
      description: 'Different spacing between items',
      code: {
        react: `<GoabBlock gap="xs">
  <p>Extra small gap</p>
  <p>Item 2</p>
</GoabBlock>
<GoabBlock gap="m">
  <p>Medium gap</p>
  <p>Item 2</p>
</GoabBlock>
<GoabBlock gap="xl">
  <p>Extra large gap</p>
  <p>Item 2</p>
</GoabBlock>`,
        angular: `<goab-block gap="xs">
  <p>Extra small gap</p>
  <p>Item 2</p>
</goab-block>
<goab-block gap="m">
  <p>Medium gap</p>
  <p>Item 2</p>
</goab-block>
<goab-block gap="xl">
  <p>Extra large gap</p>
  <p>Item 2</p>
</goab-block>`,
        webComponents: `<goa-block gap="xs">
  <p>Extra small gap</p>
  <p>Item 2</p>
</goa-block>
<goa-block gap="m">
  <p>Medium gap</p>
  <p>Item 2</p>
</goa-block>
<goa-block gap="xl">
  <p>Extra large gap</p>
  <p>Item 2</p>
</goa-block>`,
      },
    },
    {
      id: 'alignment',
      name: 'Alignment',
      description: 'Horizontal alignment options',
      code: {
        react: `<GoabBlock alignment="start">
  <GoabFormItem label="Start aligned">
    <GoabInput name="start" width="20ch" />
  </GoabFormItem>
</GoabBlock>
<GoabBlock alignment="center">
  <GoabFormItem label="Center aligned">
    <GoabInput name="center" width="20ch" />
  </GoabFormItem>
</GoabBlock>
<GoabBlock alignment="end">
  <GoabFormItem label="End aligned">
    <GoabInput name="end" width="20ch" />
  </GoabFormItem>
</GoabBlock>`,
        angular: `<goab-block alignment="start">
  <goab-form-item label="Start aligned">
    <goab-input name="start" width="20ch"></goab-input>
  </goab-form-item>
</goab-block>
<goab-block alignment="center">
  <goab-form-item label="Center aligned">
    <goab-input name="center" width="20ch"></goab-input>
  </goab-form-item>
</goab-block>
<goab-block alignment="end">
  <goab-form-item label="End aligned">
    <goab-input name="end" width="20ch"></goab-input>
  </goab-form-item>
</goab-block>`,
        webComponents: `<goa-block alignment="start">
  <goa-form-item version="2" label="Start aligned">
    <goa-input version="2" name="start" width="20ch"></goa-input>
  </goa-form-item>
</goa-block>
<goa-block alignment="center">
  <goa-form-item version="2" label="Center aligned">
    <goa-input version="2" name="center" width="20ch"></goa-input>
  </goa-form-item>
</goa-block>
<goa-block alignment="end">
  <goa-form-item version="2" label="End aligned">
    <goa-input version="2" name="end" width="20ch"></goa-input>
  </goa-form-item>
</goa-block>`,
      },
    },
    {
      id: 'horizontal',
      name: 'Horizontal layout',
      description: 'Items arranged horizontally',
      code: {
        react: `<GoabBlock direction="row" gap="l">
  <GoabFormItem label="First name">
    <GoabInput name="firstName" />
  </GoabFormItem>
  <GoabFormItem label="Last name">
    <GoabInput name="lastName" />
  </GoabFormItem>
</GoabBlock>`,
        angular: `<goab-block direction="row" gap="l">
  <goab-form-item label="First name">
    <goab-input name="firstName"></goab-input>
  </goab-form-item>
  <goab-form-item label="Last name">
    <goab-input name="lastName"></goab-input>
  </goab-form-item>
</goab-block>`,
        webComponents: `<goa-block direction="row" gap="l">
  <goa-form-item version="2" label="First name">
    <goa-input version="2" name="firstName"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="Last name">
    <goa-input version="2" name="lastName"></goa-input>
  </goa-form-item>
</goa-block>`,
      },
    },
  ],
};
