/**
 * RadioItem Component Configurations
 *
 * RadioItem is a child component of RadioGroup.
 */

import type { ComponentConfigurations } from './types';

export const radioItemConfigurations: ComponentConfigurations = {
  componentSlug: 'radio-item',
  componentName: 'Radio item',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic radio item',
      description: 'Single radio option within RadioGroup',
      code: {
        react: `<GoabRadioGroup name="option" value="">
  <GoabRadioItem value="opt1" label="Option 1" />
  <GoabRadioItem value="opt2" label="Option 2" />
  <GoabRadioItem value="opt3" label="Option 3" />
</GoabRadioGroup>`,
        angular: `<goab-radio-group name="option" value="">
  <goab-radio-item value="opt1" label="Option 1"></goab-radio-item>
  <goab-radio-item value="opt2" label="Option 2"></goab-radio-item>
  <goab-radio-item value="opt3" label="Option 3"></goab-radio-item>
</goab-radio-group>`,
        webComponents: `<goa-radio-group name="option" value="">
  <goa-radio-item value="opt1" label="Option 1"></goa-radio-item>
  <goa-radio-item value="opt2" label="Option 2"></goa-radio-item>
  <goa-radio-item value="opt3" label="Option 3"></goa-radio-item>
</goa-radio-group>`,
      },
    },
    {
      id: 'with-description',
      name: 'With description',
      description: 'Radio item with additional text',
      code: {
        react: `<GoabRadioGroup name="plan" value="">
  <GoabRadioItem value="basic" label="Basic" description="Free tier with limited features" />
  <GoabRadioItem value="pro" label="Professional" description="Full access to all features" />
</GoabRadioGroup>`,
        angular: `<goab-radio-group name="plan" value="">
  <goab-radio-item value="basic" label="Basic" description="Free tier with limited features"></goab-radio-item>
  <goab-radio-item value="pro" label="Professional" description="Full access to all features"></goab-radio-item>
</goab-radio-group>`,
        webComponents: `<goa-radio-group name="plan" value="">
  <goa-radio-item value="basic" label="Basic" description="Free tier with limited features"></goa-radio-item>
  <goa-radio-item value="pro" label="Professional" description="Full access to all features"></goa-radio-item>
</goa-radio-group>`,
      },
    },
  ],
};
