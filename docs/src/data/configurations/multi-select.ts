/**
 * Multi Select Component Configurations
 *
 * Shows common standalone Multi Select use cases wrapped in FormItem.
 */

import type { ComponentConfigurations } from "./types";

export const multiSelectConfigurations: ComponentConfigurations = {
  componentSlug: "multi-select",
  componentName: "Multi Select",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Multi select with selected values shown as removable chips",
      code: {
        react: `<GoabFormItem label="Programs" mb="l">
  <GoabMultiSelect
    name="programs"
    placeholder="Select one or more programs"
  >
    <GoabMultiSelectItem value="affordable-housing" label="Affordable housing" />
    <GoabMultiSelectItem value="child-care" label="Child care" />
    <GoabMultiSelectItem value="health-benefits" label="Health benefits" />
    <GoabMultiSelectItem value="student-aid" label="Student aid" />
  </GoabMultiSelect>
</GoabFormItem>`,
        angular: `<goab-form-item label="Programs" mb="l">
  <goab-multi-select
    name="programs"
    placeholder="Select one or more programs"
  >
    <goab-multi-select-item value="affordable-housing" label="Affordable housing" />
    <goab-multi-select-item value="child-care" label="Child care" />
    <goab-multi-select-item value="health-benefits" label="Health benefits" />
    <goab-multi-select-item value="student-aid" label="Student aid" />
  </goab-multi-select>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Programs" mb="l">
  <goa-multi-select
    version="2"
    name="programs"
    placeholder="Select one or more programs"
  >
    <goa-multi-select-option value="affordable-housing" label="Affordable housing"></goa-multi-select-option>
    <goa-multi-select-option value="child-care" label="Child care"></goa-multi-select-option>
    <goa-multi-select-option value="health-benefits" label="Health benefits"></goa-multi-select-option>
    <goa-multi-select-option value="student-aid" label="Student aid"></goa-multi-select-option>
  </goa-multi-select>
</goa-form-item>`,
      },
    },
    {
      id: "filterable",
      name: "Filterable",
      description: "Multi select with typeahead filtering for longer lists",
      code: {
        react: `<GoabFormItem label="Communities" mb="l">
  <GoabMultiSelect
    name="communities"
    placeholder="Search and select communities"
    filterable
    maxHeight="20rem"
  >
    <GoabMultiSelectItem value="airdrie" label="Airdrie" />
    <GoabMultiSelectItem value="banff" label="Banff" />
    <GoabMultiSelectItem value="calgary" label="Calgary" />
    <GoabMultiSelectItem value="canmore" label="Canmore" />
    <GoabMultiSelectItem value="edmonton" label="Edmonton" />
    <GoabMultiSelectItem value="fort-mcmurray" label="Fort McMurray" />
    <GoabMultiSelectItem value="grande-prairie" label="Grande Prairie" />
    <GoabMultiSelectItem value="lethbridge" label="Lethbridge" />
    <GoabMultiSelectItem value="medicine-hat" label="Medicine Hat" />
    <GoabMultiSelectItem value="red-deer" label="Red Deer" />
  </GoabMultiSelect>
</GoabFormItem>`,
        angular: `<goab-form-item label="Communities" mb="l">
  <goab-multi-select
    name="communities"
    placeholder="Search and select communities"
    [filterable]="true"
    maxHeight="20rem"
  >
    <goab-multi-select-item value="airdrie" label="Airdrie" />
    <goab-multi-select-item value="banff" label="Banff" />
    <goab-multi-select-item value="calgary" label="Calgary" />
    <goab-multi-select-item value="canmore" label="Canmore" />
    <goab-multi-select-item value="edmonton" label="Edmonton" />
    <goab-multi-select-item value="fort-mcmurray" label="Fort McMurray" />
    <goab-multi-select-item value="grande-prairie" label="Grande Prairie" />
    <goab-multi-select-item value="lethbridge" label="Lethbridge" />
    <goab-multi-select-item value="medicine-hat" label="Medicine Hat" />
    <goab-multi-select-item value="red-deer" label="Red Deer" />
  </goab-multi-select>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Communities" mb="l">
  <goa-multi-select
    version="2"
    name="communities"
    placeholder="Search and select communities"
    filterable="true"
    maxheight="20rem"
  >
    <goa-multi-select-option value="airdrie" label="Airdrie"></goa-multi-select-option>
    <goa-multi-select-option value="banff" label="Banff"></goa-multi-select-option>
    <goa-multi-select-option value="calgary" label="Calgary"></goa-multi-select-option>
    <goa-multi-select-option value="canmore" label="Canmore"></goa-multi-select-option>
    <goa-multi-select-option value="edmonton" label="Edmonton"></goa-multi-select-option>
    <goa-multi-select-option value="fort-mcmurray" label="Fort McMurray"></goa-multi-select-option>
    <goa-multi-select-option value="grande-prairie" label="Grande Prairie"></goa-multi-select-option>
    <goa-multi-select-option value="lethbridge" label="Lethbridge"></goa-multi-select-option>
    <goa-multi-select-option value="medicine-hat" label="Medicine Hat"></goa-multi-select-option>
    <goa-multi-select-option value="red-deer" label="Red Deer"></goa-multi-select-option>
  </goa-multi-select>
</goa-form-item>`,
      },
    },
  ],
};