import React from "react";
import {
  GoabBlock,
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
} from "@abgov/react-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";

export function Bug2502Route() {
  const onDropdownChange = (details: GoabDropdownOnChangeDetail) => {
    console.log(`Dropdown ${details.name} selected value:`, details.value);
  };

  return (
    <main>
      <h3>Bug 2502 - Dropdown Test</h3>

      <GoabBlock gap="m" direction="row">
        <GoabFormItem label="Native Dropdown">
          <GoabDropdown name="nativeDropdown" onChange={onDropdownChange} native={true}>
            <GoabDropdownItem value="red" label="Red" />
            <GoabDropdownItem value="green" label="Green" />
            <GoabDropdownItem value="blue" label="Blue" />
          </GoabDropdown>
        </GoabFormItem>

        <GoabFormItem label="Custom Dropdown">
          <GoabDropdown name="customDropdown" onChange={onDropdownChange} native={false}>
            <GoabDropdownItem value="red" label="Red" />
            <GoabDropdownItem value="green" label="Green" />
            <GoabDropdownItem value="blue" label="Blue" />
          </GoabDropdown>
        </GoabFormItem>
      </GoabBlock>
    </main>
  );
}
