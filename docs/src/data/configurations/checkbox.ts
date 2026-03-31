/**
 * Checkbox Component Configurations
 */

import type { ComponentConfigurations } from './types';

export const checkboxConfigurations: ComponentConfigurations = {
  componentSlug: 'checkbox',
  componentName: 'Checkbox',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic checkbox',
      description: 'Single checkbox with label',
      code: {
        react: `<GoabCheckbox name="agree" text="I agree to the terms" />`,
        angular: `<goab-checkbox name="agree" text="I agree to the terms"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="agree" text="I agree to the terms"></goa-checkbox>`,
      },
    },
    {
      id: 'with-description',
      name: 'With description',
      description: 'Checkbox with additional description text',
      code: {
        react: `<GoabCheckbox
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features"
/>`,
        angular: `<goab-checkbox
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features">
</goab-checkbox>`,
        webComponents: `<goa-checkbox version="2"
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features">
</goa-checkbox>`,
      },
    },
    {
      id: 'checked',
      name: 'Checked state',
      description: 'Checkbox in checked state',
      code: {
        react: `<GoabCheckbox name="remember" text="Remember me" checked />`,
        angular: `<goab-checkbox name="remember" text="Remember me" [checked]="true"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="remember" text="Remember me" checked></goa-checkbox>`,
      },
    },
    {
      id: 'indeterminate',
      name: 'Indeterminate',
      description: 'Mixed state for "select all" scenarios',
      code: {
        react: `<GoabCheckbox name="selectAll" text="Select all items" indeterminate />`,
        angular: `<goab-checkbox name="selectAll" text="Select all items" [indeterminate]="true"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="selectAll" text="Select all items" indeterminate></goa-checkbox>`,
      },
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Checkbox in disabled state',
      code: {
        react: `<GoabCheckbox name="disabled" text="Cannot be changed" disabled />
<GoabCheckbox name="disabledChecked" text="Checked and disabled" checked disabled />`,
        angular: `<goab-checkbox name="disabled" text="Cannot be changed" [disabled]="true"></goab-checkbox>
<goab-checkbox name="disabledChecked" text="Checked and disabled" [checked]="true" [disabled]="true"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="disabled" text="Cannot be changed" disabled></goa-checkbox>
<goa-checkbox version="2" name="disabledChecked" text="Checked and disabled" checked disabled></goa-checkbox>`,
      },
    },
    {
      id: 'error',
      name: 'Error state',
      description: 'Checkbox showing validation error',
      code: {
        react: `<GoabCheckbox name="terms" text="Accept terms and conditions" error />`,
        angular: `<goab-checkbox name="terms" text="Accept terms and conditions" [error]="true"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="terms" text="Accept terms and conditions" error></goa-checkbox>`,
      },
    },
  ],
};
