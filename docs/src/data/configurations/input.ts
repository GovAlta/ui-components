/**
 * Input Component Configurations
 *
 * Shows various Input use cases wrapped in FormItem.
 * Note: Input must ALWAYS be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from './types';

export const inputConfigurations: ComponentConfigurations = {
  componentSlug: 'input',
  componentName: 'Input',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic example',
      description: 'Text input wrapped in FormItem with label',
      code: {
        react: `<GoabxFormItem label="Full name" mb="l">
  <GoabxInput name="fullName" width="100%" />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Full name" mb="l">
  <goab-input name="fullName" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Full name" mb="l">
  <goa-input name="fullName" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'types',
      name: 'Input types',
      description: 'Different input types for various data formats',
      code: {
        react: `<GoabxFormItem label="Email address" mb="l">
  <GoabxInput name="email" type="email" width="100%" />
</GoabxFormItem>
<GoabxFormItem label="Password" mb="l">
  <GoabxInput name="password" type="password" width="100%" />
</GoabxFormItem>
<GoabxFormItem label="Date of birth" mb="l">
  <GoabxInput name="dob" type="date" />
</GoabxFormItem>
<GoabxFormItem label="Age" mb="l">
  <GoabxInput name="age" type="number" width="3ch" />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Email address" mb="l">
  <goab-input name="email" type="email" width="100%"></goab-input>
</goab-form-item>
<goab-form-item label="Password" mb="l">
  <goab-input name="password" type="password" width="100%"></goab-input>
</goab-form-item>
<goab-form-item label="Date of birth" mb="l">
  <goab-input name="dob" type="date"></goab-input>
</goab-form-item>
<goab-form-item label="Age" mb="l">
  <goab-input name="age" type="number" width="3ch"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Email address" mb="l">
  <goa-input name="email" type="email" width="100%"></goa-input>
</goa-form-item>
<goa-form-item label="Password" mb="l">
  <goa-input name="password" type="password" width="100%"></goa-input>
</goa-form-item>
<goa-form-item label="Date of birth" mb="l">
  <goa-input name="dob" type="date"></goa-input>
</goa-form-item>
<goa-form-item label="Age" mb="l">
  <goa-input name="age" type="number" width="3ch"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'with-icons',
      name: 'With icons',
      description: 'Inputs with leading or trailing icons',
      code: {
        react: `<GoabxFormItem label="Search" mb="l">
  <GoabxInput name="search" leadingIcon="search" width="100%" />
</GoabxFormItem>
<GoabxFormItem label="Website" mb="l">
  <GoabxInput name="website" trailingIcon="open" width="100%" />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Search" mb="l">
  <goab-input name="search" leadingIcon="search" width="100%"></goab-input>
</goab-form-item>
<goab-form-item label="Website" mb="l">
  <goab-input name="website" trailingIcon="open" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Search" mb="l">
  <goa-input name="search" leading-icon="search" width="100%"></goa-input>
</goa-form-item>
<goa-form-item label="Website" mb="l">
  <goa-input name="website" trailing-icon="open" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'fixed-widths',
      name: 'Fixed widths',
      description: 'Inputs sized for specific data types',
      code: {
        react: `<GoabxFormItem label="Postal code" mb="l">
  <GoabxInput name="postalCode" width="7ch" />
</GoabxFormItem>
<GoabxFormItem label="Year" mb="l">
  <GoabxInput name="year" type="number" width="4ch" />
</GoabxFormItem>
<GoabxFormItem label="SIN" mb="l">
  <GoabxInput name="sin" width="11ch" />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Postal code" mb="l">
  <goab-input name="postalCode" width="7ch"></goab-input>
</goab-form-item>
<goab-form-item label="Year" mb="l">
  <goab-input name="year" type="number" width="4ch"></goab-input>
</goab-form-item>
<goab-form-item label="SIN" mb="l">
  <goab-input name="sin" width="11ch"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Postal code" mb="l">
  <goa-input name="postalCode" width="7ch"></goa-input>
</goa-form-item>
<goa-form-item label="Year" mb="l">
  <goa-input name="year" type="number" width="4ch"></goa-input>
</goa-form-item>
<goa-form-item label="SIN" mb="l">
  <goa-input name="sin" width="11ch"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'leading-trailing-content',
      name: 'With leading or trailing content',
      description: 'Inputs with text content before or after the input field',
      code: {
        react: `<GoabxFormItem label="Price" mb="l">
  <GoabxInput name="price" type="number" width="10ch" leadingContent="$" />
</GoabxFormItem>
<GoabxFormItem label="Weight" mb="l">
  <GoabxInput name="weight" type="number" width="10ch" trailingContent="kg" />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Price" mb="l">
  <goab-input name="price" type="number" width="10ch" leadingContent="$"></goab-input>
</goab-form-item>
<goab-form-item label="Weight" mb="l">
  <goab-input name="weight" type="number" width="10ch" trailingContent="kg"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Price" mb="l">
  <goa-input name="price" type="number" width="10ch" leading-content="$"></goa-input>
</goa-form-item>
<goa-form-item label="Weight" mb="l">
  <goa-input name="weight" type="number" width="10ch" trailing-content="kg"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: 'states',
      name: 'States',
      description: 'Disabled, readonly, and error states',
      code: {
        react: `<GoabxFormItem label="Disabled input" mb="l">
  <GoabxInput name="disabled" disabled value="Cannot edit" width="100%" />
</GoabxFormItem>
<GoabxFormItem label="Read-only input" mb="l">
  <GoabxInput name="readonly" readOnly value="View only" width="100%" />
</GoabxFormItem>
<GoabxFormItem label="Input with error" error="This field is required" mb="l">
  <GoabxInput name="error" error width="100%" />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Disabled input" mb="l">
  <goab-input name="disabled" [disabled]="true" value="Cannot edit" width="100%"></goab-input>
</goab-form-item>
<goab-form-item label="Read-only input" mb="l">
  <goab-input name="readonly" [readOnly]="true" value="View only" width="100%"></goab-input>
</goab-form-item>
<goab-form-item label="Input with error" error="This field is required" mb="l">
  <goab-input name="error" [error]="true" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Disabled input" mb="l">
  <goa-input name="disabled" disabled value="Cannot edit" width="100%"></goa-input>
</goa-form-item>
<goa-form-item label="Read-only input" mb="l">
  <goa-input name="readonly" read-only value="View only" width="100%"></goa-input>
</goa-form-item>
<goa-form-item label="Input with error" error="This field is required" mb="l">
  <goa-input name="error" error width="100%"></goa-input>
</goa-form-item>`,
      },
    },
  ],
};
