/**
 * FormItem Component Configurations
 *
 * FormItem is a wrapper that provides labels, help text, and error messages
 * for form inputs like Input, TextArea, Dropdown, etc.
 */

import type { ComponentConfigurations } from './types';

export const formItemConfigurations: ComponentConfigurations = {
  componentSlug: 'form-item',
  componentName: 'Form item',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic example',
      description: 'Form item with label wrapping an input',
      code: {
        react: `<GoabxFormItem label="Email address" mb="l">
  <GoabxInput name="email" type="email" width="100%" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Email address" mb="l">
  <goabx-input name="email" type="email" width="100%"></goabx-input>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Email address" mb="l">
  <goa-input version="2" name="email" type="email" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'with-help-text',
      name: 'With help text',
      description: 'Form item with additional guidance',
      code: {
        react: `<GoabxFormItem label="Password" helpText="Must be at least 8 characters" mb="l">
  <GoabxInput name="password" type="password" width="100%" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Password" helpText="Must be at least 8 characters" mb="l">
  <goabx-input name="password" type="password" width="100%"></goabx-input>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Password" helpText="Must be at least 8 characters" mb="l">
  <goa-input version="2" name="password" type="password" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'required',
      name: 'Required field',
      description: 'Form item marked as required',
      code: {
        react: `<GoabxFormItem label="Full name" requirement="required" mb="l">
  <GoabxInput name="fullName" width="100%" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Full name" requirement="required" mb="l">
  <goabx-input name="fullName" width="100%"></goabx-input>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Full name" requirement="required" mb="l">
  <goa-input version="2" name="fullName" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'optional',
      name: 'Optional field',
      description: 'Form item marked as optional',
      code: {
        react: `<GoabxFormItem label="Middle name" requirement="optional" mb="l">
  <GoabxInput name="middleName" width="100%" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Middle name" requirement="optional" mb="l">
  <goabx-input name="middleName" width="100%"></goabx-input>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Middle name" requirement="optional" mb="l">
  <goa-input version="2" name="middleName" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'with-error',
      name: 'With error',
      description: 'Form item showing validation error',
      code: {
        react: `<GoabxFormItem label="Email address" error="Please enter a valid email address" mb="l">
  <GoabxInput name="email" type="email" error width="100%" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Email address" error="Please enter a valid email address" mb="l">
  <goabx-input name="email" type="email" [error]="true" width="100%"></goabx-input>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Email address" error="Please enter a valid email address" mb="l">
  <goa-input version="2" name="email" type="email" error width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'label-sizes',
      name: 'Label sizes',
      description: 'Different label size options',
      code: {
        react: `<GoabxFormItem label="Compact label" labelSize="compact" mb="l">
  <GoabxInput name="compact" width="100%" />
</GoabxFormItem>
<GoabxFormItem label="Regular label" labelSize="regular" mb="l">
  <GoabxInput name="regular" width="100%" />
</GoabxFormItem>
<GoabxFormItem label="Large label" labelSize="large" mb="l">
  <GoabxInput name="large" width="100%" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Compact label" labelSize="compact" mb="l">
  <goabx-input name="compact" width="100%"></goabx-input>
</goabx-form-item>
<goabx-form-item label="Regular label" labelSize="regular" mb="l">
  <goabx-input name="regular" width="100%"></goabx-input>
</goabx-form-item>
<goabx-form-item label="Large label" labelSize="large" mb="l">
  <goabx-input name="large" width="100%"></goabx-input>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Compact label" labelsize="compact" mb="l">
  <goa-input version="2" name="compact" width="100%"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Regular label" labelsize="regular" mb="l">
  <goa-input version="2" name="regular" width="100%"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Large label" labelsize="large" mb="l">
  <goa-input version="2" name="large" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
  ],
};
