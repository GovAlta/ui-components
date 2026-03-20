/**
 * CheckboxList Component Configurations
 *
 * Checkbox list groups multiple checkboxes together.
 */

import type { ComponentConfigurations } from "./types";

export const checkboxListConfigurations: ComponentConfigurations = {
  componentSlug: "checkbox-list",
  componentName: "Checkbox list",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic checkbox list",
      description: "Group of related checkboxes",
      code: {
        react: `<GoabxFormItem label="Select interests" mb="l">
  <GoabxCheckbox name="sports" text="Sports" />
  <GoabxCheckbox name="music" text="Music" />
  <GoabxCheckbox name="travel" text="Travel" />
  <GoabxCheckbox name="reading" text="Reading" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Select interests" mb="l">
  <goabx-checkbox name="sports" text="Sports"></goabx-checkbox>
  <goabx-checkbox name="music" text="Music"></goabx-checkbox>
  <goabx-checkbox name="travel" text="Travel"></goabx-checkbox>
  <goabx-checkbox name="reading" text="Reading"></goabx-checkbox>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Select interests" mb="l">
  <goa-checkbox version="2" name="sports" text="Sports"></goa-checkbox>
  <goa-checkbox version="2" name="music" text="Music"></goa-checkbox>
  <goa-checkbox version="2" name="travel" text="Travel"></goa-checkbox>
  <goa-checkbox version="2" name="reading" text="Reading"></goa-checkbox>
</goa-form-item>`,
      },
    },
    {
      id: "with-select-all",
      name: "With select all",
      description: "Checkbox list with select all option",
      code: {
        react: `<GoabxCheckbox name="selectAll" text="Select all" indeterminate={someSelected} checked={allSelected} />
<GoabxCheckbox name="option1" text="Option 1" checked={selected.includes('option1')} />
<GoabxCheckbox name="option2" text="Option 2" checked={selected.includes('option2')} />
<GoabxCheckbox name="option3" text="Option 3" checked={selected.includes('option3')} />`,
        angular: `<goabx-checkbox name="selectAll" text="Select all" [indeterminate]="someSelected" [checked]="allSelected"></goabx-checkbox>
<goabx-checkbox name="option1" text="Option 1" [checked]="isSelected('option1')"></goabx-checkbox>
<goabx-checkbox name="option2" text="Option 2" [checked]="isSelected('option2')"></goabx-checkbox>
<goabx-checkbox name="option3" text="Option 3" [checked]="isSelected('option3')"></goabx-checkbox>`,
        webComponents: `<goa-checkbox version="2" name="selectAll" text="Select all" indeterminate></goa-checkbox>
<goa-checkbox version="2" name="option1" text="Option 1"></goa-checkbox>
<goa-checkbox version="2" name="option2" text="Option 2"></goa-checkbox>
<goa-checkbox version="2" name="option3" text="Option 3"></goa-checkbox>`,
      },
    },
    {
      id: "with-error",
      name: "With error",
      description: "Checkbox list showing validation error",
      code: {
        react: `<GoabxFormItem label="Select at least one" error="Please select at least one option" mb="l">
  <GoabxCheckbox name="opt1" text="Option 1" error />
  <GoabxCheckbox name="opt2" text="Option 2" error />
  <GoabxCheckbox name="opt3" text="Option 3" error />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Select at least one" error="Please select at least one option" mb="l">
  <goabx-checkbox name="opt1" text="Option 1" [error]="true"></goabx-checkbox>
  <goabx-checkbox name="opt2" text="Option 2" [error]="true"></goabx-checkbox>
  <goabx-checkbox name="opt3" text="Option 3" [error]="true"></goabx-checkbox>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Select at least one" error="Please select at least one option" mb="l">
  <goa-checkbox version="2" name="opt1" text="Option 1" error></goa-checkbox>
  <goa-checkbox version="2" name="opt2" text="Option 2" error></goa-checkbox>
  <goa-checkbox version="2" name="opt3" text="Option 3" error></goa-checkbox>
</goa-form-item>`,
      },
    },
  ],
};
