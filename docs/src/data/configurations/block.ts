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
  <GoabxFormItem label="Start aligned">
    <GoabxInput name="start" width="20ch" />
  </GoabxFormItem>
</GoabBlock>
<GoabBlock alignment="center">
  <GoabxFormItem label="Center aligned">
    <GoabxInput name="center" width="20ch" />
  </GoabxFormItem>
</GoabBlock>
<GoabBlock alignment="end">
  <GoabxFormItem label="End aligned">
    <GoabxInput name="end" width="20ch" />
  </GoabxFormItem>
</GoabBlock>`,
        angular: `<goab-block alignment="start">
  <goabx-form-item label="Start aligned">
    <goabx-input name="start" width="20ch"></goabx-input>
  </goabx-form-item>
</goab-block>
<goab-block alignment="center">
  <goabx-form-item label="Center aligned">
    <goabx-input name="center" width="20ch"></goabx-input>
  </goabx-form-item>
</goab-block>
<goab-block alignment="end">
  <goabx-form-item label="End aligned">
    <goabx-input name="end" width="20ch"></goabx-input>
  </goabx-form-item>
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
  <GoabxFormItem label="First name">
    <GoabxInput name="firstName" />
  </GoabxFormItem>
  <GoabxFormItem label="Last name">
    <GoabxInput name="lastName" />
  </GoabxFormItem>
</GoabBlock>`,
        angular: `<goab-block direction="row" gap="l">
  <goabx-form-item label="First name">
    <goabx-input name="firstName"></goabx-input>
  </goabx-form-item>
  <goabx-form-item label="Last name">
    <goabx-input name="lastName"></goabx-input>
  </goabx-form-item>
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
