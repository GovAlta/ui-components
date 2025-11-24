import {
  GoabInput,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
} from "@abgov/react-components";
import { useState } from "react";

export const Bug2789Route = () => {
  const [inputValue, setInputValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  return (
    <main>
      <h2>Bug 2789: Width Units Support (rem, em)</h2>
      <p>Testing support for rem and em width units in Input and Dropdown components</p>

      <h3>Input Component Tests</h3>

      <GoabFormItem label="Rem Width (20rem)" mb="l">
        <GoabInput
          name="input-rem"
          type="text"
          value={inputValue}
          onChange={(detail) => setInputValue(detail.value)}
          width="20rem"
          placeholder="Input with 20rem width"
        />
      </GoabFormItem>

      <GoabFormItem label="Em Width (15em)" mb="l">
        <GoabInput
          name="input-em"
          type="text"
          value={inputValue}
          onChange={(detail) => setInputValue(detail.value)}
          width="15em"
          placeholder="Input with 15em width"
        />
      </GoabFormItem>

      <GoabFormItem label="Pixel Width (300px) - Existing" mb="l">
        <GoabInput
          name="input-px"
          type="text"
          value={inputValue}
          onChange={(detail) => setInputValue(detail.value)}
          width="300px"
          placeholder="Input with 300px width"
        />
      </GoabFormItem>

      <GoabFormItem label="Percentage Width (50%) - Existing" mb="l">
        <GoabInput
          name="input-percent"
          type="text"
          value={inputValue}
          onChange={(detail) => setInputValue(detail.value)}
          width="50%"
          placeholder="Input with 50% width"
        />
      </GoabFormItem>

      <GoabFormItem label="Character Width (25ch) - Existing" mb="l">
        <GoabInput
          name="input-ch"
          type="text"
          value={inputValue}
          onChange={(detail) => setInputValue(detail.value)}
          width="25ch"
          placeholder="Input with 25ch width"
        />
      </GoabFormItem>

      <h3>Dropdown Component Tests</h3>

      <GoabFormItem label="Rem Width (20rem)" mb="l">
        <GoabDropdown
          name="dropdown-rem"
          value={dropdownValue}
          onChange={(detail) => setDropdownValue(detail.value || "")}
          width="20rem"
          placeholder="Dropdown with 20rem width"
        >
          <GoabDropdownItem value="option1" label="First Option" />
          <GoabDropdownItem value="option2" label="Second Option" />
          <GoabDropdownItem value="option3" label="Third Option" />
          <GoabDropdownItem
            value="longoption"
            label="A very long option text to test width"
          />
        </GoabDropdown>
      </GoabFormItem>

      <GoabFormItem label="Em Width (20em)" mb="l">
        <GoabDropdown
          name="dropdown-em"
          value={dropdownValue}
          onChange={(detail) => setDropdownValue(detail.value || "")}
          width="20em"
          placeholder="Dropdown with 20em width"
        >
          <GoabDropdownItem value="apple" label="Apple" />
          <GoabDropdownItem value="banana" label="Banana" />
          <GoabDropdownItem value="cherry" label="Cherry" />
          <GoabDropdownItem value="dragonfruit" label="Dragon Fruit - Very Long Name" />
        </GoabDropdown>
      </GoabFormItem>

      <GoabFormItem label="Default Width (auto)" mb="l">
        <GoabDropdown
          name="dropdown-default"
          value={dropdownValue}
          onChange={(detail) => setDropdownValue(detail.value || "")}
          placeholder="Dropdown with default width"
        >
          <GoabDropdownItem value="red" label="Red" />
          <GoabDropdownItem value="green" label="Green" />
          <GoabDropdownItem value="blue" label="Blue" />
          <GoabDropdownItem value="yellow" label="Yellow - Another Long Option" />
        </GoabDropdown>
      </GoabFormItem>

      <GoabFormItem label="Character Width (30ch) - Existing" mb="l">
        <GoabDropdown
          name="dropdown-ch"
          value={dropdownValue}
          onChange={(detail) => setDropdownValue(detail.value || "")}
          width="30ch"
          placeholder="Dropdown with 30ch width"
        >
          <GoabDropdownItem value="monday" label="Monday" />
          <GoabDropdownItem value="tuesday" label="Tuesday" />
          <GoabDropdownItem value="wednesday" label="Wednesday" />
          <GoabDropdownItem value="thursday" label="Thursday - Long Day Name" />
        </GoabDropdown>
      </GoabFormItem>

      <h3>Test Instructions</h3>
      <ul>
        <li>
          Verify that rem and em width units are properly applied to both Input and
          Dropdown components
        </li>
        <li>
          Check that the components resize correctly when the browser font size is changed
          (for rem/em units)
        </li>
        <li>Ensure existing width units (px, %, ch) still work as expected</li>
        <li>
          Test that dropdown menus open and display correctly with the new width units
        </li>
        <li>Verify that the width calculations are accurate and consistent</li>
        <li>Test that dropdown items are properly displayed and selectable</li>
      </ul>
    </main>
  );
};
