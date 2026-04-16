/**
 * Input Component Configurations
 *
 * Shows various Input use cases wrapped in FormItem.
 * Note: Input must ALWAYS be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const inputConfigurations: ComponentConfigurations = {
  componentSlug: "input",
  componentName: "Input",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Text input wrapped in FormItem with label",
      code: {
        react: `<GoabFormItem label="Full name" mb="l">
  <GoabInput name="fullName" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Full name" mb="l">
  <goab-input name="fullName"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Full name" mb="l">
  <goa-input version="2" name="fullName"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "with-icons",
      name: "With icons",
      description: "Inputs with leading or trailing icons",
      code: {
        react: `<GoabFormItem label="Search" mb="l">
  <GoabInput name="search" leadingIcon="search" width="30ch" />
</GoabFormItem>
<GoabFormItem label="Website" mb="l">
  <GoabInput name="website" trailingIcon="open" width="30ch" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Search" mb="l">
  <goab-input name="search" leadingIcon="search" width="30ch"></goab-input>
</goab-form-item>
<goab-form-item label="Website" mb="l">
  <goab-input name="website" trailingIcon="open" width="30ch"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Search" mb="l">
  <goa-input version="2" name="search" leadingicon="search" width="30ch"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Website" mb="l">
  <goa-input version="2" name="website" trailingicon="open" width="30ch"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "clearable",
      name: "Clearable",
      description: "Input with a clickable trailing icon to clear the field",
      code: {
        react: `<GoabFormItem label="Search" mb="l">
  <GoabInput
    name="search"
    value={value}
    trailingIcon="close"
    handleTrailingIconClick
    onTrailingIconClick={() => setValue("")}
    onChange={(e) => setValue(e.value)}
  />
</GoabFormItem>`,
        angular: `<goab-form-item label="Search" mb="l">
  <goab-input
    name="search"
    [value]="value"
    trailingIcon="close"
    [handleTrailingIconClick]="true"
    (onTrailingIconClick)="value = ''">
  </goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Search" mb="l">
  <goa-input version="2"
    id="clearable-input"
    name="search"
    trailingicon="close"
    handletrailingiconclick="true">
  </goa-input>
</goa-form-item>
<script>
  var input = document.getElementById("clearable-input");
  input.addEventListener("_trailingIconClick", function() {
    input.value = "";
  });
</script>`,
      },
    },
    {
      id: "known-widths",
      name: "Known widths",
      description: "Inputs sized for specific data types",
      code: {
        react: `<GoabFormItem label="Postal code" mb="l">
  <GoabInput name="postalCode" width="7ch" />
</GoabFormItem>
<GoabFormItem label="Year" mb="l">
  <GoabInput name="year" width="4ch" />
</GoabFormItem>
<GoabFormItem label="SIN" mb="l">
  <GoabInput name="sin" width="11ch" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Postal code" mb="l">
  <goab-input name="postalCode" width="7ch"></goab-input>
</goab-form-item>
<goab-form-item label="Year" mb="l">
  <goab-input name="year" width="4ch"></goab-input>
</goab-form-item>
<goab-form-item label="SIN" mb="l">
  <goab-input name="sin" width="11ch"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Postal code" mb="l">
  <goa-input version="2" name="postalCode" width="7ch"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Year" mb="l">
  <goa-input version="2" name="year" width="4ch"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="SIN" mb="l">
  <goa-input version="2" name="sin" width="11ch"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "leading-trailing-content",
      name: "With leading or trailing content",
      description: "Inputs with text content before or after the input field",
      code: {
        react: `<GoabFormItem label="Price" mb="l">
  <GoabInput name="price" type="number" width="10ch" leadingContent="$" />
</GoabFormItem>
<GoabFormItem label="Weight" mb="l">
  <GoabInput name="weight" type="number" width="10ch" trailingContent="kg" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Price" mb="l">
  <goab-input name="price" type="number" width="10ch">
    <div slot="leadingContent">$</div>
  </goab-input>
</goab-form-item>
<goab-form-item label="Weight" mb="l">
  <goab-input name="weight" type="number" width="10ch">
    <div slot="trailingContent">kg</div>
  </goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Price" mb="l">
  <goa-input version="2" name="price" type="number" width="10ch">
    <div slot="leadingContent">$</div>
  </goa-input>
</goa-form-item>
<goa-form-item version="2" label="Weight" mb="l">
  <goa-input version="2" name="weight" type="number" width="10ch">
    <div slot="trailingContent">kg</div>
  </goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabFormItem label="Default size" mb="l">
  <GoabInput name="sizeDefault" />
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabInput name="sizeCompact" size="compact" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Default size" mb="l">
  <goab-input name="sizeDefault"></goab-input>
</goab-form-item>
<goab-form-item label="Compact size" labelSize="compact" mb="l">
  <goab-input name="sizeCompact" size="compact"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-input version="2" name="sizeDefault"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-input version="2" name="sizeCompact" size="compact"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "right-aligned",
      name: "Right-aligned text",
      description: "Text aligned to the right for numeric values",
      code: {
        react: `<GoabFormItem label="Amount" mb="l">
  <GoabInput name="amount" type="number" textAlign="right" width="10ch" trailingContent="CAD" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Amount" mb="l">
  <goab-input name="amount" type="number" textAlign="right" width="10ch">
    <div slot="trailingContent">CAD</div>
  </goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Amount" mb="l">
  <goa-input version="2" name="amount" type="number" textalign="right" width="10ch">
    <div slot="trailingContent">CAD</div>
  </goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled, readonly, and error states",
      code: {
        react: `<GoabFormItem label="Disabled input" mb="l">
  <GoabInput name="disabled" disabled value="Cannot edit" />
</GoabFormItem>
<GoabFormItem label="Read-only input" mb="l">
  <GoabInput name="readonly" readOnly value="View only" />
</GoabFormItem>
<GoabFormItem label="Input with error" error="This field is required" mb="l">
  <GoabInput name="error" error />
</GoabFormItem>`,
        angular: `<goab-form-item label="Disabled input" mb="l">
  <goab-input name="disabled" [disabled]="true" value="Cannot edit"></goab-input>
</goab-form-item>
<goab-form-item label="Read-only input" mb="l">
  <goab-input name="readonly" [readOnly]="true" value="View only"></goab-input>
</goab-form-item>
<goab-form-item label="Input with error" error="This field is required" mb="l">
  <goab-input name="error" [error]="true"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Disabled input" mb="l">
  <goa-input version="2" name="disabled" disabled value="Cannot edit"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Read-only input" mb="l">
  <goa-input version="2" name="readonly" readonly value="View only"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Input with error" error="This field is required" mb="l">
  <goa-input version="2" name="error" error></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "types",
      name: "Input types",
      description: "Different input types for various data formats",
      code: {
        react: `<GoabFormItem label="Email address" mb="l">
  <GoabInput name="email" type="email" />
</GoabFormItem>
<GoabFormItem label="Password" mb="l">
  <GoabInput name="password" type="password" />
</GoabFormItem>
<GoabFormItem label="Date of birth" mb="l">
  <GoabInput name="dob" type="date" />
</GoabFormItem>
<GoabFormItem label="Age" mb="l">
  <GoabInput name="age" type="number" width="3ch" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Email address" mb="l">
  <goab-input name="email" type="email"></goab-input>
</goab-form-item>
<goab-form-item label="Password" mb="l">
  <goab-input name="password" type="password"></goab-input>
</goab-form-item>
<goab-form-item label="Date of birth" mb="l">
  <goab-input name="dob" type="date"></goab-input>
</goab-form-item>
<goab-form-item label="Age" mb="l">
  <goab-input name="age" type="number" width="3ch"></goab-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Email address" mb="l">
  <goa-input version="2" name="email" type="email"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Password" mb="l">
  <goa-input version="2" name="password" type="password"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Date of birth" mb="l">
  <goa-input version="2" name="dob" type="date"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Age" mb="l">
  <goa-input version="2" name="age" type="number" width="3ch"></goa-input>
</goa-form-item>`,
      },
    },
  ],
};
