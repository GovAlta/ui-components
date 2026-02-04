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
        react: `<GoabxRadioGroup name="option" value="">
  <GoabxRadioItem value="opt1" label="Option 1" />
  <GoabxRadioItem value="opt2" label="Option 2" />
  <GoabxRadioItem value="opt3" label="Option 3" />
</GoabxRadioGroup>`,
        angular: `<goabx-radio-group name="option" value="">
  <goabx-radio-item value="opt1" label="Option 1"></goabx-radio-item>
  <goabx-radio-item value="opt2" label="Option 2"></goabx-radio-item>
  <goabx-radio-item value="opt3" label="Option 3"></goabx-radio-item>
</goabx-radio-group>`,
        webComponents: `<goa-radio-group version="2" name="option" value="">
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
        react: `<GoabxRadioGroup name="plan" value="">
  <GoabxRadioItem value="basic" label="Basic" description="Free tier with limited features" />
  <GoabxRadioItem value="pro" label="Professional" description="Full access to all features" />
</GoabxRadioGroup>`,
        angular: `<goabx-radio-group name="plan" value="">
  <goabx-radio-item value="basic" label="Basic" description="Free tier with limited features"></goabx-radio-item>
  <goabx-radio-item value="pro" label="Professional" description="Full access to all features"></goabx-radio-item>
</goabx-radio-group>`,
        webComponents: `<goa-radio-group version="2" name="plan" value="">
  <goa-radio-item value="basic" label="Basic" description="Free tier with limited features"></goa-radio-item>
  <goa-radio-item value="pro" label="Professional" description="Full access to all features"></goa-radio-item>
</goa-radio-group>`,
      },
    },
  ],
};
