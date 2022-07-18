import * as React from 'react';
import { GoADropdown, GoADropdownOption } from "@abgov/react-components";
import { useState } from 'react';

export default function Dropdown() {

  const [value, setValue] = useState('');

  function onChange(name: string, value: any) {
    setValue(value);
  }

  const [value2, setValue2] = useState('');

  function onChange2(name: string, value: any) {
    setValue2(value);
  }

  return (
    <>
      <h3>Dropdown</h3>
      <GoADropdown
        name="colors"
        placeholder="Select a user"
        value={value}
        onChange={onChange}
      >
        <GoADropdownOption value="red" name="colors" label="Red"></GoADropdownOption>
        <GoADropdownOption
          value="green"
          name="colors"
          label="Green"
        ></GoADropdownOption>
        <GoADropdownOption
          value="blue"
          name="colors"
          label="Blue"
        ></GoADropdownOption>
      </GoADropdown >

      <h3>Error</h3>
      <GoADropdown name="colors2" placeholder="Select a user" error={true} value={value2} onChange={onChange2}>
        <GoADropdownOption value="red" name="colors2" label="Red"></GoADropdownOption>
        <GoADropdownOption
          value="green"
          name="colors2"
          label="Green"
        ></GoADropdownOption>
        <GoADropdownOption
          value="blue"
          name="colors2"
          label="Blue"
        ></GoADropdownOption>
      </GoADropdown>
    </>
  );
}

