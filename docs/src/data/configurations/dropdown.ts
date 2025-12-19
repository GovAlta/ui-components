/**
 * Dropdown Component Configurations
 *
 * Shows various Dropdown use cases wrapped in FormItem.
 * Note: Dropdown must ALWAYS be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from './types';

export const dropdownConfigurations: ComponentConfigurations = {
  componentSlug: 'dropdown',
  componentName: 'Dropdown',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic example',
      description: 'Simple dropdown with options',
      code: {
        react: `<GoabFormItem label="Province or territory" mb="l">
  <GoabDropdown name="province">
    <GoabDropdownItem value="Alberta" />
    <GoabDropdownItem value="British Columbia" />
    <GoabDropdownItem value="Manitoba" />
    <GoabDropdownItem value="New Brunswick" />
    <GoabDropdownItem value="Newfoundland and Labrador" />
    <GoabDropdownItem value="Nova Scotia" />
    <GoabDropdownItem value="Northwest Territories" />
    <GoabDropdownItem value="Nunavut" />
    <GoabDropdownItem value="Ontario" />
    <GoabDropdownItem value="Prince Edward Island" />
    <GoabDropdownItem value="Quebec" />
    <GoabDropdownItem value="Saskatchewan" />
    <GoabDropdownItem value="Yukon" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: `<goab-form-item label="Province or territory" mb="l">
  <goab-dropdown name="province">
    <goab-dropdown-item value="Alberta"></goab-dropdown-item>
    <goab-dropdown-item value="British Columbia"></goab-dropdown-item>
    <goab-dropdown-item value="Manitoba"></goab-dropdown-item>
    <goab-dropdown-item value="New Brunswick"></goab-dropdown-item>
    <goab-dropdown-item value="Newfoundland and Labrador"></goab-dropdown-item>
    <goab-dropdown-item value="Nova Scotia"></goab-dropdown-item>
    <goab-dropdown-item value="Northwest Territories"></goab-dropdown-item>
    <goab-dropdown-item value="Nunavut"></goab-dropdown-item>
    <goab-dropdown-item value="Ontario"></goab-dropdown-item>
    <goab-dropdown-item value="Prince Edward Island"></goab-dropdown-item>
    <goab-dropdown-item value="Quebec"></goab-dropdown-item>
    <goab-dropdown-item value="Saskatchewan"></goab-dropdown-item>
    <goab-dropdown-item value="Yukon"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Province or territory" mb="l">
  <goa-dropdown name="province">
    <goa-dropdown-item value="Alberta"></goa-dropdown-item>
    <goa-dropdown-item value="British Columbia"></goa-dropdown-item>
    <goa-dropdown-item value="Manitoba"></goa-dropdown-item>
    <goa-dropdown-item value="New Brunswick"></goa-dropdown-item>
    <goa-dropdown-item value="Newfoundland and Labrador"></goa-dropdown-item>
    <goa-dropdown-item value="Nova Scotia"></goa-dropdown-item>
    <goa-dropdown-item value="Northwest Territories"></goa-dropdown-item>
    <goa-dropdown-item value="Nunavut"></goa-dropdown-item>
    <goa-dropdown-item value="Ontario"></goa-dropdown-item>
    <goa-dropdown-item value="Prince Edward Island"></goa-dropdown-item>
    <goa-dropdown-item value="Quebec"></goa-dropdown-item>
    <goa-dropdown-item value="Saskatchewan"></goa-dropdown-item>
    <goa-dropdown-item value="Yukon"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: 'with-custom-placeholder',
      name: 'With custom placeholder',
      description: 'Dropdown with placeholder text when no selection',
      code: {
        react: `<GoabFormItem label="How would you like to be contacted?" mb="l">
  <GoabDropdown name="contactMethod" placeholder="—Select contact method—">
    <GoabDropdownItem value="Email" />
    <GoabDropdownItem value="Phone" />
    <GoabDropdownItem value="Mail" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: `<goab-form-item label="How would you like to be contacted?" mb="l">
  <goab-dropdown name="contactMethod" placeholder="—Select contact method—">
    <goab-dropdown-item value="Email"></goab-dropdown-item>
    <goab-dropdown-item value="Phone"></goab-dropdown-item>
    <goab-dropdown-item value="Mail"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>`,
        webComponents: `<goa-form-item label="How would you like to be contacted?" mb="l">
  <goa-dropdown name="contactMethod" placeholder="—Select contact method—">
    <goa-dropdown-item value="Email"></goa-dropdown-item>
    <goa-dropdown-item value="Phone"></goa-dropdown-item>
    <goa-dropdown-item value="Mail"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: 'filterable',
      name: 'Filterable',
      description: 'Dropdown with search/filter capability for long lists',
      code: {
        react: `<GoabFormItem label="City" mb="l">
  <GoabDropdown name="city" filterable>
    <GoabDropdownItem value="Airdrie" />
    <GoabDropdownItem value="Beaumont" />
    <GoabDropdownItem value="Brooks" />
    <GoabDropdownItem value="Calgary" />
    <GoabDropdownItem value="Camrose" />
    <GoabDropdownItem value="Chestermere" />
    <GoabDropdownItem value="Cold Lake" />
    <GoabDropdownItem value="Edmonton" />
    <GoabDropdownItem value="Fort Saskatchewan" />
    <GoabDropdownItem value="Grande Prairie" />
    <GoabDropdownItem value="Lacombe" />
    <GoabDropdownItem value="Leduc" />
    <GoabDropdownItem value="Lethbridge" />
    <GoabDropdownItem value="Lloydminster" />
    <GoabDropdownItem value="Medicine Hat" />
    <GoabDropdownItem value="Okotoks" />
    <GoabDropdownItem value="Red Deer" />
    <GoabDropdownItem value="Spruce Grove" />
    <GoabDropdownItem value="St. Albert" />
    <GoabDropdownItem value="Wetaskiwin" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: `<goab-form-item label="City" mb="l">
  <goab-dropdown name="city" [filterable]="true">
    <goab-dropdown-item value="Airdrie"></goab-dropdown-item>
    <goab-dropdown-item value="Beaumont"></goab-dropdown-item>
    <goab-dropdown-item value="Brooks"></goab-dropdown-item>
    <goab-dropdown-item value="Calgary"></goab-dropdown-item>
    <goab-dropdown-item value="Camrose"></goab-dropdown-item>
    <goab-dropdown-item value="Chestermere"></goab-dropdown-item>
    <goab-dropdown-item value="Cold Lake"></goab-dropdown-item>
    <goab-dropdown-item value="Edmonton"></goab-dropdown-item>
    <goab-dropdown-item value="Fort Saskatchewan"></goab-dropdown-item>
    <goab-dropdown-item value="Grande Prairie"></goab-dropdown-item>
    <goab-dropdown-item value="Lacombe"></goab-dropdown-item>
    <goab-dropdown-item value="Leduc"></goab-dropdown-item>
    <goab-dropdown-item value="Lethbridge"></goab-dropdown-item>
    <goab-dropdown-item value="Lloydminster"></goab-dropdown-item>
    <goab-dropdown-item value="Medicine Hat"></goab-dropdown-item>
    <goab-dropdown-item value="Okotoks"></goab-dropdown-item>
    <goab-dropdown-item value="Red Deer"></goab-dropdown-item>
    <goab-dropdown-item value="Spruce Grove"></goab-dropdown-item>
    <goab-dropdown-item value="St. Albert"></goab-dropdown-item>
    <goab-dropdown-item value="Wetaskiwin"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>`,
        webComponents: `<goa-form-item label="City" mb="l">
  <goa-dropdown name="city" filterable>
    <goa-dropdown-item value="Airdrie"></goa-dropdown-item>
    <goa-dropdown-item value="Beaumont"></goa-dropdown-item>
    <goa-dropdown-item value="Brooks"></goa-dropdown-item>
    <goa-dropdown-item value="Calgary"></goa-dropdown-item>
    <goa-dropdown-item value="Camrose"></goa-dropdown-item>
    <goa-dropdown-item value="Chestermere"></goa-dropdown-item>
    <goa-dropdown-item value="Cold Lake"></goa-dropdown-item>
    <goa-dropdown-item value="Edmonton"></goa-dropdown-item>
    <goa-dropdown-item value="Fort Saskatchewan"></goa-dropdown-item>
    <goa-dropdown-item value="Grande Prairie"></goa-dropdown-item>
    <goa-dropdown-item value="Lacombe"></goa-dropdown-item>
    <goa-dropdown-item value="Leduc"></goa-dropdown-item>
    <goa-dropdown-item value="Lethbridge"></goa-dropdown-item>
    <goa-dropdown-item value="Lloydminster"></goa-dropdown-item>
    <goa-dropdown-item value="Medicine Hat"></goa-dropdown-item>
    <goa-dropdown-item value="Okotoks"></goa-dropdown-item>
    <goa-dropdown-item value="Red Deer"></goa-dropdown-item>
    <goa-dropdown-item value="Spruce Grove"></goa-dropdown-item>
    <goa-dropdown-item value="St. Albert"></goa-dropdown-item>
    <goa-dropdown-item value="Wetaskiwin"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: 'states',
      name: 'States',
      description: 'Disabled and error states',
      code: {
        react: `<GoabFormItem label="Disabled dropdown" mb="l">
  <GoabDropdown name="disabled" disabled value="AB">
    <GoabDropdownItem value="AB">Alberta</GoabDropdownItem>
    <GoabDropdownItem value="BC">British Columbia</GoabDropdownItem>
  </GoabDropdown>
</GoabFormItem>
<GoabFormItem label="Dropdown with error" error="Please select an option" mb="l">
  <GoabDropdown name="error" error placeholder="Select an option">
    <GoabDropdownItem value="opt1">Option 1</GoabDropdownItem>
    <GoabDropdownItem value="opt2">Option 2</GoabDropdownItem>
  </GoabDropdown>
</GoabFormItem>`,
        angular: `<goab-form-item label="Disabled dropdown" mb="l">
  <goab-dropdown name="disabled" [disabled]="true" value="AB">
    <goab-dropdown-item value="AB">Alberta</goab-dropdown-item>
    <goab-dropdown-item value="BC">British Columbia</goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>
<goab-form-item label="Dropdown with error" error="Please select an option" mb="l">
  <goab-dropdown name="error" [error]="true" placeholder="Select an option">
    <goab-dropdown-item value="opt1">Option 1</goab-dropdown-item>
    <goab-dropdown-item value="opt2">Option 2</goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Disabled dropdown" mb="l">
  <goa-dropdown name="disabled" disabled value="AB">
    <goa-dropdown-item value="AB">Alberta</goa-dropdown-item>
    <goa-dropdown-item value="BC">British Columbia</goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
<goa-form-item label="Dropdown with error" error="Please select an option" mb="l">
  <goa-dropdown name="error" error placeholder="Select an option">
    <goa-dropdown-item value="opt1">Option 1</goa-dropdown-item>
    <goa-dropdown-item value="opt2">Option 2</goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
  ],
};
