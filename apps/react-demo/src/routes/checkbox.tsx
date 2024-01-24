import * as React from "react";
import { GoACheckbox } from "@abgov/react-components";
import { useState } from "react";

export default function Checkbox() {
  const [desserts1, setDesserts1] = useState(false);
  const [desserts2, setDesserts2] = useState(true);
  const [desserts3, setDesserts3] = useState(false);

  function onChange1(name: string, checked: boolean, value: string) {
    setDesserts1(checked);
    console.log(name, checked, value);
  }

  function onChange2(name: string, checked: boolean, value: string) {
    setDesserts2(checked);
    console.log(name, checked, value);
  }

  function onChange3(name: string, checked: boolean, value: string) {
    setDesserts3(checked);
    console.log(name, checked, value);
  }

  return (
    <>
      <h1>Checkbox</h1>

      <h2>Basic</h2>
      <GoACheckbox
        name="desserts"
        text="Ice Cream"
        value={10}
        checked={desserts1}
        onChange={(name, checked, value) => onChange1(name, checked, value)}
        testId="basicCheckbox"
      ></GoACheckbox>

      <h2>Checked</h2>
      <GoACheckbox
        name="desserts"
        text="Ice Cream"
        value="10"
        checked={desserts2}
        onChange={(name, checked, value) => onChange2(name, checked, value)}
        testId="defaultCheckedCheckbox"
      ></GoACheckbox>

      <h2>Disabled</h2>
      <GoACheckbox
        name="desserts"
        text="Ice Cream"
        value="10"
        disabled
        checked={false}
        testId="disabledCheckbox"
      ></GoACheckbox>

      <h2>Error</h2>
      <GoACheckbox
        name="desserts"
        text="Ice Cream"
        value="10"
        checked={desserts3}
        onChange={(name, checked, value) => onChange3(name, checked, value)}
        error
        testId="errorCheckbox"
      ></GoACheckbox>

      <h2>Aria Label</h2>
      <GoACheckbox
        name="aria"
        text="Aria Label"
        value="10"
        checked={desserts3}
        onChange={(name, checked, value) => onChange3(name, checked, value)}
        ariaLabel="Some random aria label here"
      ></GoACheckbox>

      <h2>Margin Spacing</h2>
      <GoACheckbox
        mt="m"
        mb="xs"
        ml="xl"
        mr="2xl"
        name="desserts"
        text="Ice Cream"
        value={10}
        checked={desserts1}
        onChange={(name, checked, value) => onChange1(name, checked, value)}
      ></GoACheckbox>
    </>
  );
}
