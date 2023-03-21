import * as React from "react";
import {GoAButton, GoADropdown, GoADropdownItem} from "@abgov/react-components";
import { useState } from "react";

export default function Dropdown() {
  const [selectedColor, setSelectedColor] = useState("green");
  function noop(_name: string, _value: string | string[]) {
    // do nothing
  }

  const provinces: string[] = [
    "BC",
    "Alberta",
    "Saskatchewan",
    "Manitoba",
    "Ontario",
    "Quebec",
  ];

  const cities: Record<string, string[]> = {
    BC: ["Vancouver", "Kelowna", "Fernie"],
    Alberta: ["Edmonton", "Calgary"],
    Saskatchewan: ["Regina", "Saskatoon"],
    Manitoba: ["Winnipeg"],
    Ontario: ["Toronto", "Ottawa"],
    Quebec: ["Montreal", "Quebec City"],
  };

  const [pcities, setPcities] = useState<string[]>([]);

  function selectProvince(_name: string, value: string | string[]) {
    if (typeof value === "string") setPcities(cities[value]);
  }

  return (
    <>
      <h1>Dropdown</h1>

      <h2>Default</h2>
      <GoADropdown name="colors" placeholder="Select a color" onChange={noop}>
        <GoADropdownItem key="red" value="red" label="Red" />
        <GoADropdownItem key="green" value="green" label="Green" />
        <GoADropdownItem key="value" value="blue" label="Blue" />
      </GoADropdown>


      <h2>Reactive Binding
        <GoAButton onClick={() => setSelectedColor("red")} type="tertiary">
        Change to red
      </GoAButton>
      </h2>

      <div>Selected Color: {selectedColor}</div>
      <br/>
      <GoADropdown name="colors" placeholder="Select a color" onChange={(e) => setSelectedColor(e)} value={selectedColor}>
        <GoADropdownItem key="red" value="red" label="Red" />
        <GoADropdownItem key="green" value="green" label="Green" />
        <GoADropdownItem key="value" value="blue" label="Blue" />
      </GoADropdown>

      <h2>Native</h2>
      <GoADropdown
        name="colors-native"
        placeholder="Select a user"
        value="green"
        native={true}
        onChange={noop}
      >
        <GoADropdownItem key="red" value="red" label="Red" />
        <GoADropdownItem key="green" value="green" label="Green" />
        <GoADropdownItem key="blue" value="blue" label="Blue" />
      </GoADropdown>

      <h2>Error</h2>
      <GoADropdown
        name="colors2"
        placeholder="Select a user"
        error={true}
        value="green"
        onChange={noop}
      >
        <GoADropdownItem key="red" value="red" label="Red" />
        <GoADropdownItem key="green" value="green" label="Green" />
        <GoADropdownItem key="blue" value="blue" label="Blue" />
      </GoADropdown>

      <h2>Dynamic</h2>
      <GoADropdown name="province" onChange={selectProvince}>
        {provinces.map((p) => (
          <GoADropdownItem key={p} value={p} label={p} />
        ))}
      </GoADropdown>

      <GoADropdown name="city" onChange={noop} placeholder="City">
        {pcities.map((p) => (
          <GoADropdownItem key={p} value={p} label={p} />
        ))}
      </GoADropdown>

      <h2>Aria Label</h2>
      <GoADropdown
        name="aria"
        placeholder="Select a user"
        value="blue"
        onChange={noop}
        ariaLabel="Some random aria label"
      >
        <GoADropdownItem key="red" value="red" label="Red" />
        <GoADropdownItem key="green" value="green" label="Green" />
        <GoADropdownItem key="blue" value="blue" label="Blue" />
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
        <GoADropdownItem key="red" value="red" label="Red" />
        <GoADropdownItem key="green" value="green" label="Green" />
        <GoADropdownItem key="blue" value="blue" label="Blue" />
      </GoADropdown>
    </>
  );
}
