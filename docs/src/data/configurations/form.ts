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
  <GoabxFormItem label="Name" mb="l">
    <GoabxInput name="name" width="100%" />
  </GoabxFormItem>
  <GoabxFormItem label="Email" mb="l">
    <GoabxInput name="email" type="email" width="100%" />
  </GoabxFormItem>
  <GoabButtonGroup mt="l">
    <GoabxButton type="submit">Submit</GoabxButton>
  </GoabButtonGroup>
</GoabForm>`,
        angular: `<goab-form (_submit)="handleSubmit($event)">
  <goabx-form-item label="Name" mb="l">
    <goabx-input name="name" width="100%"></goabx-input>
  </goabx-form-item>
  <goabx-form-item label="Email" mb="l">
    <goabx-input name="email" type="email" width="100%"></goabx-input>
  </goabx-form-item>
  <goab-button-group mt="l">
    <goabx-button type="submit">Submit</goabx-button>
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
