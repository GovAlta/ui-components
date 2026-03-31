/**
 * Form Component Configurations
 *
 * Form wraps form elements with proper structure.
 */

import type { ComponentConfigurations } from './types';

export const formConfigurations: ComponentConfigurations = {
  componentSlug: 'form',
  componentName: 'Form',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic form',
      description: 'Simple form wrapper',
      code: {
        react: `<GoabForm onSubmit={handleSubmit}>
  <GoabFormItem label="Name" mb="l">
    <GoabInput name="name" width="100%" />
  </GoabFormItem>
  <GoabFormItem label="Email" mb="l">
    <GoabInput name="email" type="email" width="100%" />
  </GoabFormItem>
  <GoabButtonGroup mt="l">
    <GoabButton type="submit">Submit</GoabButton>
  </GoabButtonGroup>
</GoabForm>`,
        angular: `<goab-form (_submit)="handleSubmit($event)">
  <goab-form-item label="Name" mb="l">
    <goab-input name="name" width="100%"></goab-input>
  </goab-form-item>
  <goab-form-item label="Email" mb="l">
    <goab-input name="email" type="email" width="100%"></goab-input>
  </goab-form-item>
  <goab-button-group mt="l">
    <goab-button type="submit">Submit</goab-button>
  </goab-button-group>
</goab-form>`,
        webComponents: `<goa-form>
  <goa-form-item version="2" label="Name" mb="l">
    <goa-input version="2" name="name" width="100%"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="Email" mb="l">
    <goa-input version="2" name="email" type="email" width="100%"></goa-input>
  </goa-form-item>
  <goa-button-group mt="l">
    <goa-button version="2" type="submit">Submit</goa-button>
  </goa-button-group>
</goa-form>`,
      },
    },
  ],
};
