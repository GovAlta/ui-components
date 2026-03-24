/**
 * Dropdown Component Configurations
 *
 * Shows various Dropdown use cases wrapped in FormItem.
 * Note: Dropdown must ALWAYS be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const dropdownConfigurations: ComponentConfigurations = {
  componentSlug: "dropdown",
  componentName: "Dropdown",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Simple dropdown with options",
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
        webComponents: `<goa-form-item version="2" label="Province or territory" mb="l">
  <goa-dropdown version="2" name="province">
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
      id: "with-custom-placeholder",
      name: "With custom placeholder",
      description: "Dropdown with placeholder text when no selection",
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
        webComponents: `<goa-form-item version="2" label="How would you like to be contacted?" mb="l">
  <goa-dropdown version="2" name="contactMethod" placeholder="—Select contact method—">
    <goa-dropdown-item value="Email"></goa-dropdown-item>
    <goa-dropdown-item value="Phone"></goa-dropdown-item>
    <goa-dropdown-item value="Mail"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "filterable",
      name: "Filterable",
      description: "Dropdown with search/filter capability for long lists",
      code: {
        react: `<GoabFormItem label="What city do you live in?" mb="l">
  <GoabDropdown name="city" filterable leadingIcon="search" maxHeight="400px">
    <GoabDropdownItem value="Airdrie" />
    <GoabDropdownItem value="Athabasca" />
    <GoabDropdownItem value="Banff" />
    <GoabDropdownItem value="Barrhead" />
    <GoabDropdownItem value="Beaumont" />
    <GoabDropdownItem value="Bonnyville" />
    <GoabDropdownItem value="Brooks" />
    <GoabDropdownItem value="Calgary" />
    <GoabDropdownItem value="Camrose" />
    <GoabDropdownItem value="Canmore" />
    <GoabDropdownItem value="Chestermere" />
    <GoabDropdownItem value="Cochrane" />
    <GoabDropdownItem value="Cold Lake" />
    <GoabDropdownItem value="Drayton Valley" />
    <GoabDropdownItem value="Drumheller" />
    <GoabDropdownItem value="Edmonton" />
    <GoabDropdownItem value="Edson" />
    <GoabDropdownItem value="Fort McMurray" />
    <GoabDropdownItem value="Fort Saskatchewan" />
    <GoabDropdownItem value="Grande Prairie" />
    <GoabDropdownItem value="High River" />
    <GoabDropdownItem value="Hinton" />
    <GoabDropdownItem value="Jasper" />
    <GoabDropdownItem value="Lacombe" />
    <GoabDropdownItem value="Leduc" />
    <GoabDropdownItem value="Lethbridge" />
    <GoabDropdownItem value="Lloydminster" />
    <GoabDropdownItem value="Medicine Hat" />
    <GoabDropdownItem value="Morinville" />
    <GoabDropdownItem value="Okotoks" />
    <GoabDropdownItem value="Olds" />
    <GoabDropdownItem value="Peace River" />
    <GoabDropdownItem value="Ponoka" />
    <GoabDropdownItem value="Red Deer" />
    <GoabDropdownItem value="Sherwood Park" />
    <GoabDropdownItem value="Spruce Grove" />
    <GoabDropdownItem value="St. Albert" />
    <GoabDropdownItem value="Stettler" />
    <GoabDropdownItem value="Stony Plain" />
    <GoabDropdownItem value="Sylvan Lake" />
    <GoabDropdownItem value="Taber" />
    <GoabDropdownItem value="Vegreville" />
    <GoabDropdownItem value="Vermilion" />
    <GoabDropdownItem value="Wainwright" />
    <GoabDropdownItem value="Westlock" />
    <GoabDropdownItem value="Wetaskiwin" />
    <GoabDropdownItem value="Whitecourt" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: `<goab-form-item label="What city do you live in?" mb="l">
  <goab-dropdown name="city" [filterable]="true" leadingIcon="search" maxHeight="400px">
    <goab-dropdown-item value="Airdrie"></goab-dropdown-item>
    <goab-dropdown-item value="Athabasca"></goab-dropdown-item>
    <goab-dropdown-item value="Banff"></goab-dropdown-item>
    <goab-dropdown-item value="Barrhead"></goab-dropdown-item>
    <goab-dropdown-item value="Beaumont"></goab-dropdown-item>
    <goab-dropdown-item value="Bonnyville"></goab-dropdown-item>
    <goab-dropdown-item value="Brooks"></goab-dropdown-item>
    <goab-dropdown-item value="Calgary"></goab-dropdown-item>
    <goab-dropdown-item value="Camrose"></goab-dropdown-item>
    <goab-dropdown-item value="Canmore"></goab-dropdown-item>
    <goab-dropdown-item value="Chestermere"></goab-dropdown-item>
    <goab-dropdown-item value="Cochrane"></goab-dropdown-item>
    <goab-dropdown-item value="Cold Lake"></goab-dropdown-item>
    <goab-dropdown-item value="Drayton Valley"></goab-dropdown-item>
    <goab-dropdown-item value="Drumheller"></goab-dropdown-item>
    <goab-dropdown-item value="Edmonton"></goab-dropdown-item>
    <goab-dropdown-item value="Edson"></goab-dropdown-item>
    <goab-dropdown-item value="Fort McMurray"></goab-dropdown-item>
    <goab-dropdown-item value="Fort Saskatchewan"></goab-dropdown-item>
    <goab-dropdown-item value="Grande Prairie"></goab-dropdown-item>
    <goab-dropdown-item value="High River"></goab-dropdown-item>
    <goab-dropdown-item value="Hinton"></goab-dropdown-item>
    <goab-dropdown-item value="Jasper"></goab-dropdown-item>
    <goab-dropdown-item value="Lacombe"></goab-dropdown-item>
    <goab-dropdown-item value="Leduc"></goab-dropdown-item>
    <goab-dropdown-item value="Lethbridge"></goab-dropdown-item>
    <goab-dropdown-item value="Lloydminster"></goab-dropdown-item>
    <goab-dropdown-item value="Medicine Hat"></goab-dropdown-item>
    <goab-dropdown-item value="Morinville"></goab-dropdown-item>
    <goab-dropdown-item value="Okotoks"></goab-dropdown-item>
    <goab-dropdown-item value="Olds"></goab-dropdown-item>
    <goab-dropdown-item value="Peace River"></goab-dropdown-item>
    <goab-dropdown-item value="Ponoka"></goab-dropdown-item>
    <goab-dropdown-item value="Red Deer"></goab-dropdown-item>
    <goab-dropdown-item value="Sherwood Park"></goab-dropdown-item>
    <goab-dropdown-item value="Spruce Grove"></goab-dropdown-item>
    <goab-dropdown-item value="St. Albert"></goab-dropdown-item>
    <goab-dropdown-item value="Stettler"></goab-dropdown-item>
    <goab-dropdown-item value="Stony Plain"></goab-dropdown-item>
    <goab-dropdown-item value="Sylvan Lake"></goab-dropdown-item>
    <goab-dropdown-item value="Taber"></goab-dropdown-item>
    <goab-dropdown-item value="Vegreville"></goab-dropdown-item>
    <goab-dropdown-item value="Vermilion"></goab-dropdown-item>
    <goab-dropdown-item value="Wainwright"></goab-dropdown-item>
    <goab-dropdown-item value="Westlock"></goab-dropdown-item>
    <goab-dropdown-item value="Wetaskiwin"></goab-dropdown-item>
    <goab-dropdown-item value="Whitecourt"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="What city do you live in?" mb="l">
  <goa-dropdown version="2" name="city" filterable leadingicon="search" maxheight="400px">
    <goa-dropdown-item value="Airdrie"></goa-dropdown-item>
    <goa-dropdown-item value="Athabasca"></goa-dropdown-item>
    <goa-dropdown-item value="Banff"></goa-dropdown-item>
    <goa-dropdown-item value="Barrhead"></goa-dropdown-item>
    <goa-dropdown-item value="Beaumont"></goa-dropdown-item>
    <goa-dropdown-item value="Bonnyville"></goa-dropdown-item>
    <goa-dropdown-item value="Brooks"></goa-dropdown-item>
    <goa-dropdown-item value="Calgary"></goa-dropdown-item>
    <goa-dropdown-item value="Camrose"></goa-dropdown-item>
    <goa-dropdown-item value="Canmore"></goa-dropdown-item>
    <goa-dropdown-item value="Chestermere"></goa-dropdown-item>
    <goa-dropdown-item value="Cochrane"></goa-dropdown-item>
    <goa-dropdown-item value="Cold Lake"></goa-dropdown-item>
    <goa-dropdown-item value="Drayton Valley"></goa-dropdown-item>
    <goa-dropdown-item value="Drumheller"></goa-dropdown-item>
    <goa-dropdown-item value="Edmonton"></goa-dropdown-item>
    <goa-dropdown-item value="Edson"></goa-dropdown-item>
    <goa-dropdown-item value="Fort McMurray"></goa-dropdown-item>
    <goa-dropdown-item value="Fort Saskatchewan"></goa-dropdown-item>
    <goa-dropdown-item value="Grande Prairie"></goa-dropdown-item>
    <goa-dropdown-item value="High River"></goa-dropdown-item>
    <goa-dropdown-item value="Hinton"></goa-dropdown-item>
    <goa-dropdown-item value="Jasper"></goa-dropdown-item>
    <goa-dropdown-item value="Lacombe"></goa-dropdown-item>
    <goa-dropdown-item value="Leduc"></goa-dropdown-item>
    <goa-dropdown-item value="Lethbridge"></goa-dropdown-item>
    <goa-dropdown-item value="Lloydminster"></goa-dropdown-item>
    <goa-dropdown-item value="Medicine Hat"></goa-dropdown-item>
    <goa-dropdown-item value="Morinville"></goa-dropdown-item>
    <goa-dropdown-item value="Okotoks"></goa-dropdown-item>
    <goa-dropdown-item value="Olds"></goa-dropdown-item>
    <goa-dropdown-item value="Peace River"></goa-dropdown-item>
    <goa-dropdown-item value="Ponoka"></goa-dropdown-item>
    <goa-dropdown-item value="Red Deer"></goa-dropdown-item>
    <goa-dropdown-item value="Sherwood Park"></goa-dropdown-item>
    <goa-dropdown-item value="Spruce Grove"></goa-dropdown-item>
    <goa-dropdown-item value="St. Albert"></goa-dropdown-item>
    <goa-dropdown-item value="Stettler"></goa-dropdown-item>
    <goa-dropdown-item value="Stony Plain"></goa-dropdown-item>
    <goa-dropdown-item value="Sylvan Lake"></goa-dropdown-item>
    <goa-dropdown-item value="Taber"></goa-dropdown-item>
    <goa-dropdown-item value="Vegreville"></goa-dropdown-item>
    <goa-dropdown-item value="Vermilion"></goa-dropdown-item>
    <goa-dropdown-item value="Wainwright"></goa-dropdown-item>
    <goa-dropdown-item value="Westlock"></goa-dropdown-item>
    <goa-dropdown-item value="Wetaskiwin"></goa-dropdown-item>
    <goa-dropdown-item value="Whitecourt"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "native",
      name: "Native",
      description: "Native HTML select element compared with custom dropdown",
      code: {
        react: `<GoabFormItem label="Custom dropdown" mb="l">
  <GoabDropdown name="custom">
    <GoabDropdownItem value="opt1" label="Option 1" />
    <GoabDropdownItem value="opt2" label="Option 2" />
    <GoabDropdownItem value="opt3" label="Option 3" />
  </GoabDropdown>
</GoabFormItem>
<GoabFormItem label="Native dropdown" mb="l">
  <GoabDropdown name="native" native>
    <GoabDropdownItem value="opt1" label="Option 1" />
    <GoabDropdownItem value="opt2" label="Option 2" />
    <GoabDropdownItem value="opt3" label="Option 3" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: `<goab-form-item label="Custom dropdown" mb="l">
  <goab-dropdown name="custom">
    <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
    <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    <goab-dropdown-item value="opt3" label="Option 3"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>
<goab-form-item label="Native dropdown" mb="l">
  <goab-dropdown name="native" [native]="true">
    <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
    <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    <goab-dropdown-item value="opt3" label="Option 3"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Custom dropdown" mb="l">
  <goa-dropdown version="2" name="custom">
    <goa-dropdown-item value="opt1" label="Option 1"></goa-dropdown-item>
    <goa-dropdown-item value="opt2" label="Option 2"></goa-dropdown-item>
    <goa-dropdown-item value="opt3" label="Option 3"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
<goa-form-item version="2" label="Native dropdown" mb="l">
  <goa-dropdown version="2" name="native" native>
    <goa-dropdown-item value="opt1" label="Option 1"></goa-dropdown-item>
    <goa-dropdown-item value="opt2" label="Option 2"></goa-dropdown-item>
    <goa-dropdown-item value="opt3" label="Option 3"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabFormItem label="Default size" mb="l">
  <GoabDropdown name="sizeDefault">
    <GoabDropdownItem value="Draft" />
    <GoabDropdownItem value="In review" />
    <GoabDropdownItem value="Approved" />
  </GoabDropdown>
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabDropdown name="sizeCompact" size="compact">
    <GoabDropdownItem value="Draft" />
    <GoabDropdownItem value="In review" />
    <GoabDropdownItem value="Approved" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: `<goab-form-item label="Default size" mb="l">
  <goab-dropdown name="sizeDefault">
    <goab-dropdown-item value="Draft"></goab-dropdown-item>
    <goab-dropdown-item value="In review"></goab-dropdown-item>
    <goab-dropdown-item value="Approved"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>
<goab-form-item label="Compact size" labelSize="compact" mb="l">
  <goab-dropdown name="sizeCompact" size="compact">
    <goab-dropdown-item value="Draft"></goab-dropdown-item>
    <goab-dropdown-item value="In review"></goab-dropdown-item>
    <goab-dropdown-item value="Approved"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-dropdown version="2" name="sizeDefault">
    <goa-dropdown-item value="Draft"></goa-dropdown-item>
    <goa-dropdown-item value="In review"></goa-dropdown-item>
    <goa-dropdown-item value="Approved"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-dropdown version="2" name="sizeCompact" size="compact">
    <goa-dropdown-item value="Draft"></goa-dropdown-item>
    <goa-dropdown-item value="In review"></goa-dropdown-item>
    <goa-dropdown-item value="Approved"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
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
        webComponents: `<goa-form-item version="2" label="Disabled dropdown" mb="l">
  <goa-dropdown version="2" name="disabled" disabled value="AB">
    <goa-dropdown-item value="AB">Alberta</goa-dropdown-item>
    <goa-dropdown-item value="BC">British Columbia</goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
<goa-form-item version="2" label="Dropdown with error" error="Please select an option" mb="l">
  <goa-dropdown version="2" name="error" error placeholder="Select an option">
    <goa-dropdown-item value="opt1">Option 1</goa-dropdown-item>
    <goa-dropdown-item value="opt2">Option 2</goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
  ],
};
