/**
 * CheckboxList Component Configurations
 *
 * Checkbox list groups multiple checkboxes together.
 */

import type { ComponentConfigurations } from './types';

export const checkboxListConfigurations: ComponentConfigurations = {
  componentSlug: 'checkbox-list',
  componentName: 'Checkbox list',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic checkbox list',
      description: 'Group of related checkboxes',
      code: {
        react: `<GoabxFormItem label="Select interests" mb="l">
  <GoabxCheckbox name="sports" text="Sports" />
  <GoabxCheckbox name="music" text="Music" />
  <GoabxCheckbox name="travel" text="Travel" />
  <GoabxCheckbox name="reading" text="Reading" />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Select interests" mb="l">
  <goab-checkbox name="sports" text="Sports"></goab-checkbox>
  <goab-checkbox name="music" text="Music"></goab-checkbox>
  <goab-checkbox name="travel" text="Travel"></goab-checkbox>
  <goab-checkbox name="reading" text="Reading"></goab-checkbox>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Select interests" mb="l">
  <goa-checkbox name="sports" text="Sports"></goa-checkbox>
  <goa-checkbox name="music" text="Music"></goa-checkbox>
  <goa-checkbox name="travel" text="Travel"></goa-checkbox>
  <goa-checkbox name="reading" text="Reading"></goa-checkbox>
</goa-form-item>`,
      },
    },
    {
      id: 'with-select-all',
      name: 'With select all',
      description: 'Checkbox list with select all option',
      code: {
        react: `<GoabxCheckbox name="selectAll" text="Select all" indeterminate={someSelected} checked={allSelected} />
<GoabxCheckbox name="option1" text="Option 1" checked={selected.includes('option1')} />
<GoabxCheckbox name="option2" text="Option 2" checked={selected.includes('option2')} />
<GoabxCheckbox name="option3" text="Option 3" checked={selected.includes('option3')} />`,
        angular: `<goab-checkbox name="selectAll" text="Select all" [indeterminate]="someSelected" [checked]="allSelected"></goab-checkbox>
<goab-checkbox name="option1" text="Option 1" [checked]="isSelected('option1')"></goab-checkbox>
<goab-checkbox name="option2" text="Option 2" [checked]="isSelected('option2')"></goab-checkbox>
<goab-checkbox name="option3" text="Option 3" [checked]="isSelected('option3')"></goab-checkbox>`,
        webComponents: `<goa-checkbox name="selectAll" text="Select all" indeterminate></goa-checkbox>
<goa-checkbox name="option1" text="Option 1"></goa-checkbox>
<goa-checkbox name="option2" text="Option 2"></goa-checkbox>
<goa-checkbox name="option3" text="Option 3"></goa-checkbox>`,
      },
    },
    {
      id: 'with-error',
      name: 'With error',
      description: 'Checkbox list showing validation error',
      code: {
        react: `<GoabxFormItem label="Select at least one" error="Please select at least one option" mb="l">
  <GoabxCheckbox name="opt1" text="Option 1" error />
  <GoabxCheckbox name="opt2" text="Option 2" error />
  <GoabxCheckbox name="opt3" text="Option 3" error />
</GoabxFormItem>`,
        angular: `<goab-form-item label="Select at least one" error="Please select at least one option" mb="l">
  <goab-checkbox name="opt1" text="Option 1" [error]="true"></goab-checkbox>
  <goab-checkbox name="opt2" text="Option 2" [error]="true"></goab-checkbox>
  <goab-checkbox name="opt3" text="Option 3" [error]="true"></goab-checkbox>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Select at least one" error="Please select at least one option" mb="l">
  <goa-checkbox name="opt1" text="Option 1" error></goa-checkbox>
  <goa-checkbox name="opt2" text="Option 2" error></goa-checkbox>
  <goa-checkbox name="opt3" text="Option 3" error></goa-checkbox>
</goa-form-item>`,
      },
    },
  ],
};
