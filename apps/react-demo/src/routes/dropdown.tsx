import * as React from "react";
import { GoADropdown, GoADropdownOption } from "@abgov/react-components";

export default function Dropdown() {
  function noop(name: string, value: string | string[]) {
    // do nothing
  }

  const dynamicItems = [
    {
      name: "Fruits",
      value: "banana",
      options: [{ value: "apple" }, { value: "orange" }, { value: "banana" }],
    },
    {
      name: "Vegetables",
      value: "carrot",
      options: [
        { value: "brocolli" },
        { value: "carrot" },
        { value: "spinach" },
      ],
    },
  ];

  return (
    <>
      <h1>Dropdown</h1>

      <h2>Default</h2>
      <GoADropdown name="colors" placeholder="Select a user" onChange={noop}>
        <GoADropdownOption key="red" value="red" label="Red" />
        <GoADropdownOption key="green" value="green" label="Green" />
        <GoADropdownOption key="value" value="blue" label="Blue" />
      </GoADropdown>

      <h2>Native</h2>
      <GoADropdown
        name="colors-native"
        placeholder="Select a user"
        value="green"
        native={true}
        onChange={noop}
      >
        <GoADropdownOption key="red" value="red" label="Red" />
        <GoADropdownOption key="green" value="green" label="Green" />
        <GoADropdownOption key="blue" value="blue" label="Blue" />
      </GoADropdown>

      <h2>Error</h2>
      <GoADropdown
        name="colors2"
        placeholder="Select a user"
        error={true}
        value="green"
        onChange={noop}
      >
        <GoADropdownOption key="red" value="red" label="Red" />
        <GoADropdownOption key="green" value="green" label="Green" />
        <GoADropdownOption key="blue" value="blue" label="Blue" />
      </GoADropdown>

      <h2>Dynamic</h2>
      {dynamicItems.map((item) => (
        <GoADropdown
          key={item.name}
          name={item.name}
          value={item.value}
          onChange={noop}
        >
          {item.options.map((option) => (
            <GoADropdownOption
              key={option.value}
              value={option.value}
              name={item.name}
              label={option.value}
            />
          ))}
        </GoADropdown>
      ))}

      <h2>Aria Label</h2>
      <GoADropdown
        name="aria"
        placeholder="Select a user"
        value="blue"
        onChange={noop}
        ariaLabel="Some random aria label"
      >
        <GoADropdownOption key="red" value="red" label="Red" />
        <GoADropdownOption key="green" value="green" label="Green" />
        <GoADropdownOption key="blue" value="blue" label="Blue" />
      </GoADropdown>

      <h2>Margin Spacing</h2>
      <GoADropdown
        name="colors"
        placeholder="Select a user"
        value="blue"
        onChange={noop}
        mt="m"
        mb="xs"
        ml="xl"
        mr="2xl"
      >
        <GoADropdownOption key="red" value="red" label="Red" />
        <GoADropdownOption key="green" value="green" label="Green" />
        <GoADropdownOption key="blue" value="blue" label="Blue" />
      </GoADropdown>
    </>
  );
}
