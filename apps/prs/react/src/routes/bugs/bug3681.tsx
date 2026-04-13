import { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
} from "@abgov/react-components";

export function Bug3681Route() {
  const [value, setValue] = useState("red");

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3681: Dropdown refinements
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3681"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Four menu option color states need fixing: Default (not chosen, not hovered)
            should be text-secondary. Hovered (not chosen) should be text-default +
            greyscale-100 bg. Currently chosen (not hovered) should be text-light +
            interactive bg. Currently chosen + hovered should be text-light +
            interactive-hover bg.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Dropdown with pre-selected value</GoabText>
      <GoabText tag="p">
        Open the dropdown and inspect the 4 states: 1) Default items (not Red), 2) Hover a
        non-chosen item, 3) The chosen item (Red), 4) Hover the chosen item. Check text
        color and background for each state.
      </GoabText>

      <GoabFormItem label="Favorite color" mt="m">
        <GoabDropdown value={value} onChange={(detail) => setValue(detail.value ?? "")}>
          <GoabDropdownItem value="red" label="Red" />
          <GoabDropdownItem value="blue" label="Blue" />
          <GoabDropdownItem value="green" label="Green" />
          <GoabDropdownItem value="yellow" label="Yellow" />
          <GoabDropdownItem value="purple" label="Purple" />
          <GoabDropdownItem value="orange" label="Orange" />
          <GoabDropdownItem value="teal" label="Teal" />
        </GoabDropdown>
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Dropdown with no initial value</GoabText>
      <GoabText tag="p">
        All items should show as default state (text-secondary). Select one to see the
        chosen state.
      </GoabText>

      <GoabFormItem label="Select a province" mt="m">
        <GoabDropdown>
          <GoabDropdownItem value="ab" label="Alberta" />
          <GoabDropdownItem value="bc" label="British Columbia" />
          <GoabDropdownItem value="sk" label="Saskatchewan" />
          <GoabDropdownItem value="mb" label="Manitoba" />
          <GoabDropdownItem value="on" label="Ontario" />
        </GoabDropdown>
      </GoabFormItem>
    </div>
  );
}

export default Bug3681Route;
