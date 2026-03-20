/**
 * Checkbox Component Configurations
 */

import type { ComponentConfigurations } from "./types";

export const checkboxConfigurations: ComponentConfigurations = {
  componentSlug: "checkbox",
  componentName: "Checkbox",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic checkbox",
      description: "Single checkbox with label",
      code: {
        react: `<GoabxCheckbox name="agree" text="I agree to the terms" />`,
        angular: `<goabx-checkbox name="agree" text="I agree to the terms"></goabx-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="agree" text="I agree to the terms"></goa-checkbox>`,
      },
    },
    {
      id: "with-description",
      name: "With description",
      description: "Checkbox with additional description text",
      code: {
        react: `<GoabxCheckbox
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features"
/>`,
        angular: `<goabx-checkbox
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features">
</goabx-checkbox>`,
        webComponents: `<goa-checkbox version="2"
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features">
</goa-checkbox>`,
      },
    },
    {
      id: "checked",
      name: "Checked state",
      description: "Checkbox in checked state",
      code: {
        react: `<GoabxCheckbox name="remember" text="Remember me" checked />`,
        angular: `<goabx-checkbox name="remember" text="Remember me" [checked]="true"></goabx-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="remember" text="Remember me" checked></goa-checkbox>`,
      },
    },
    {
      id: "indeterminate",
      name: "Indeterminate",
      description: 'Mixed state for "select all" scenarios',
      code: {
        react: `<GoabxCheckbox name="selectAll" text="Select all items" indeterminate />`,
        angular: `<goabx-checkbox name="selectAll" text="Select all items" [indeterminate]="true"></goabx-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="selectAll" text="Select all items" indeterminate></goa-checkbox>`,
      },
    },
    {
      id: "disabled",
      name: "Disabled",
      description: "Checkbox in disabled state",
      code: {
        react: `<GoabxCheckbox name="disabled" text="Cannot be changed" disabled />
<GoabxCheckbox name="disabledChecked" text="Checked and disabled" checked disabled />`,
        angular: `<goabx-checkbox name="disabled" text="Cannot be changed" [disabled]="true"></goabx-checkbox>
<goabx-checkbox name="disabledChecked" text="Checked and disabled" [checked]="true" [disabled]="true"></goabx-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="disabled" text="Cannot be changed" disabled></goa-checkbox>
<goa-checkbox version="2" name="disabledChecked" text="Checked and disabled" checked disabled></goa-checkbox>`,
      },
    },
    {
      id: "error",
      name: "Error state",
      description: "Checkbox showing validation error",
      code: {
        react: `<GoabxCheckbox name="terms" text="Accept terms and conditions" error />`,
        angular: `<goabx-checkbox name="terms" text="Accept terms and conditions" [error]="true"></goabx-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="terms" text="Accept terms and conditions" error></goa-checkbox>`,
      },
    },
  ],
};
