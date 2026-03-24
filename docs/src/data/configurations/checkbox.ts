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
        react: `<GoabCheckbox name="agree" text="I agree to the terms" />`,
        angular: `<goab-checkbox name="agree" text="I agree to the terms"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="agree" text="I agree to the terms"></goa-checkbox>`,
      },
    },
    {
      id: "with-description",
      name: "With description",
      description: "Checkbox with additional description text",
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
      id: "indeterminate",
      name: "Indeterminate",
      description: "Mixed state for select all scenarios",
      code: {
        react: `<GoabCheckbox name="selectAll" text="Select all items" indeterminate />`,
        angular: `<goab-checkbox name="selectAll" text="Select all items" [indeterminate]="true"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="selectAll" text="Select all items" indeterminate></goa-checkbox>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabCheckbox name="default" text="Default size checkbox" mb="m" />
<GoabCheckbox name="compact" text="Compact size checkbox" size="compact" />`,
        angular: `<goab-checkbox name="default" text="Default size checkbox" mb="m"></goab-checkbox>
<goab-checkbox name="compact" text="Compact size checkbox" size="compact"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="default" text="Default size checkbox" mb="m"></goa-checkbox>
<goa-checkbox version="2" name="compact" text="Compact size checkbox" size="compact"></goa-checkbox>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: `<GoabCheckbox name="disabled" text="Cannot be changed" disabled mb="m" />
<GoabCheckbox name="disabledChecked" text="Checked and disabled" checked disabled mb="m" />
<GoabCheckbox name="terms" text="Accept terms and conditions" error />`,
        angular: `<goab-checkbox name="disabled" text="Cannot be changed" [disabled]="true" mb="m"></goab-checkbox>
<goab-checkbox name="disabledChecked" text="Checked and disabled" [checked]="true" [disabled]="true" mb="m"></goab-checkbox>
<goab-checkbox name="terms" text="Accept terms and conditions" [error]="true"></goab-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="disabled" text="Cannot be changed" disabled mb="m"></goa-checkbox>
<goa-checkbox version="2" name="disabledChecked" text="Checked and disabled" checked disabled mb="m"></goa-checkbox>
<goa-checkbox version="2" name="terms" text="Accept terms and conditions" error></goa-checkbox>`,
      },
    },
  ],
};
