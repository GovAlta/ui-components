/**
 * FormItem Component Configurations
 *
 * FormItem is a wrapper that provides labels, help text, and error messages
 * for form inputs like Input, TextArea, Dropdown, etc.
 */

import type { ComponentConfigurations } from "./types";

export const formItemConfigurations: ComponentConfigurations = {
  componentSlug: "form-item",
  componentName: "Form item",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Form item with label wrapping an input",
      code: {
        react: `<GoabFormItem label="Email address" mb="l">
  <GoabInput name="email" type="email" width="100%" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Email address" mb="l">
  <goab-input name="email" type="email" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Email address" mb="l">
  <goa-input version="2" name="email" type="email" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "with-help-text",
      name: "With help text",
      description: "Form item with additional guidance",
      code: {
        react: `<GoabFormItem label="Password" helpText="Must be at least 8 characters" mb="l">
  <GoabInput name="password" type="password" width="100%" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Password" helpText="Must be at least 8 characters" mb="l">
  <goab-input name="password" type="password" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Password" helptext="Must be at least 8 characters" mb="l">
  <goa-input version="2" name="password" type="password" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "required",
      name: "Required field",
      description: "Form item marked as required",
      code: {
        react: `<GoabFormItem label="Full name" requirement="required" mb="l">
  <GoabInput name="fullName" width="100%" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Full name" requirement="required" mb="l">
  <goab-input name="fullName" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Full name" requirement="required" mb="l">
  <goa-input version="2" name="fullName" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "optional",
      name: "Optional field",
      description: "Form item marked as optional",
      code: {
        react: `<GoabFormItem label="Middle name" requirement="optional" mb="l">
  <GoabInput name="middleName" width="100%" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Middle name" requirement="optional" mb="l">
  <goab-input name="middleName" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Middle name" requirement="optional" mb="l">
  <goa-input version="2" name="middleName" width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "with-error",
      name: "With error",
      description: "Form item showing validation error",
      code: {
        react: `<GoabFormItem label="Email address" error="Please enter a valid email address" mb="l">
  <GoabInput name="email" type="email" error width="100%" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Email address" error="Please enter a valid email address" mb="l">
  <goab-input name="email" type="email" [error]="true" width="100%"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Email address" error="Please enter a valid email address" mb="l">
  <goa-input version="2" name="email" type="email" error width="100%"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "label-sizes",
      name: "Label sizes",
      description: "Different label size options",
      code: {
        react: `<GoabFormItem label="Compact label" labelSize="compact" mb="l">
  <GoabInput name="compact" width="100%" />
</GoabFormItem>
<GoabFormItem label="Regular label" labelSize="regular" mb="l">
  <GoabInput name="regular" width="100%" />
</GoabFormItem>
<GoabFormItem label="Large label" labelSize="large" mb="l">
  <GoabInput name="large" width="100%" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Compact label" labelSize="compact" mb="l">
  <goab-input name="compact" width="100%"></goab-input>
</goab-form-item>
<goab-form-item label="Regular label" labelSize="regular" mb="l">
  <goab-input name="regular" width="100%"></goab-input>
</goab-form-item>
<goab-form-item label="Large label" labelSize="large" mb="l">
  <goab-input name="large" width="100%"></goab-input>
</goab-form-item>`,
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
