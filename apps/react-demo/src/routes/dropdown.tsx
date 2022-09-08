import * as React from 'react';
import { GoADropdown, GoADropdownOption } from "@abgov/react-components";

export default function Dropdown() {

  function noop(name: string, value: string | string[]) {
    // do nothing
  }

  const dynamicItems = [
    {
      name: "Fruits", 
      value: "banana",
      options: [{value: "apple"}, {value: "orange"}, {value: "banana"}]
    },
    {
      name: "Vegetables", 
      value: "carrot",
      options: [{value: "brocolli"}, {value: "carrot"}, {value: "spinach"}]
    },
  ]

  return (
    <>
      <h1>Dropdown</h1>

      <h2>Default</h2>
      <GoADropdown
        name="colors"
        placeholder="Select a user"
        value="blue"
        onChange={noop}
      >
        <GoADropdownOption value="red" name="colors" label="Red" />
        <GoADropdownOption value="green" name="colors" label="Green" />
        <GoADropdownOption value="blue" name="colors" label="Blue" />
      </GoADropdown >

      <h2>Error</h2>
      <GoADropdown 
        name="colors2" 
        placeholder="Select a user" 
        error={true} 
        value="green" 
        onChange={noop}
      >
        <GoADropdownOption value="red" name="colors2" label="Red" />
        <GoADropdownOption value="green" name="colors2" label="Green" />
        <GoADropdownOption value="blue" name="colors2" label="Blue" />
      </GoADropdown>

      <h2>Dynamic</h2>
      {dynamicItems.map(item => 
        <div>
          <GoADropdown 
            key={item.name} 
            name={item.name} 
            value={item.value} 
            onChange={noop}
          >
            {item.options.map(option => 
              <GoADropdownOption key={option.value} value={option.value} name={item.name} label={option.value} />
            )} 
          </GoADropdown>
        </div>
      )}
    </>
  );
}

