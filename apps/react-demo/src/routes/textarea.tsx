import * as React from "react";
import { useState } from "react";
import {
  GoATextArea,
  GoAInput,
  GoAFormItem,
  GoAGrid,
} from "@abgov/react-components";

export default function TextArea() {
  const [value, setValue] = useState("Initial value");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("");
  const [value7, setValue7] = useState("");

  function onChange(name: string, value: string) {
    setValue(value);
    console.log(name, value);
  }

  function onKeyPress(name: string, value: string, key: string) {
    setValue(value);
    console.log(name, value, key);
  }

  function onChange4(name: string, value: string) {
    setValue4(value);
    console.log(name, value);
  }

  function onChange5(name: string, value: string) {
    setValue5(value);
    console.log(name, value);
  }

  function onChange6(name: string, value: string) {
    setValue6(value);
    console.log(name, value);
  }

  function onChange7(name: string, value: string) {
    setValue7(value);
    console.log(name, value);
  }

  return (
    <>
      <h1>TextArea</h1>
      <h2>Basic</h2>
      <GoATextArea name="comment-basic" value={value} onChange={onChange} />

      <h2>Disabled</h2>
      <GoATextArea
        name="comment-disabled"
        value={value4}
        onChange={onChange4}
        disabled={true}
      />

      <h2>Placeholder</h2>
      <GoATextArea
        placeholder="Tell us what you think.."
        name="comment"
        value={value5}
        onChange={onChange5}
      />

      <h2>Rows</h2>
      <GoATextArea
        rows={4}
        name="comment"
        value={value6}
        onChange={onChange6}
      />

      <h2>Error state</h2>
      <GoATextArea
        error={true}
        name="comment"
        value={value7}
        onChange={onChange7}
      />

      <h2>Aria Label</h2>
      <GoATextArea
        rows={4}
        name="aria"
        value={value6}
        onChange={onChange6}
        ariaLabel="Some random aria label here"
      />
      <h2>Margin Spacing</h2>
      <GoATextArea
        name="comment-basic"
        value={value}
        onChange={onChange}
        mt="m"
        mb="xs"
        ml="xl"
        mr="2xl"
      />

      <h2>on Key Press</h2>
      <GoATextArea
        rows={4}
        name="comment"
        value={value6}
        onChange={onChange6}
        onKeyPress={onKeyPress}
      />
    </>
  );
}
