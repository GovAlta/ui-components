import * as React from 'react';
import { useState } from 'react';
import { GoATextArea } from '@abgov/react-components';

export default function TextArea() {

  const [value, setValue] = useState("Initial value");
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');
  const [value8, setValue8] = useState('');
  const [value9, setValue9] = useState('');

  function onChange(name: string, value: string) {
    setValue(value);
    console.log(name, value);
  }

  function onChange2(name: string, value: string) {
    setValue2(value);
    console.log(name, value);
  }

  function onChange3(name: string, value: string) {
    setValue3(value);
    console.log(name, value);
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

  function onChange8(name: string, value: string) {
    setValue8(value);
    console.log(name, value);
  }

  function onChange9(name: string, value: string) {
    setValue9(value);
    console.log(name, value);
  }

  return (
    <>
      <h3>Basic</h3>
      <GoATextArea
        name="comment-basic"
        value={value}
        onChange={onChange}
      ></GoATextArea>

      <h3>Character count</h3>
      <GoATextArea name="firstname"
        value={value2}
        onChange={onChange2}
        showCounter={true}></GoATextArea>

      <h3>Character count with limit</h3>
      <GoATextArea
        name="firstname"
        value={value3}
        onChange={onChange3}
        showCounter={true}
        maxCharCount={20}
      ></GoATextArea>

      <h3>Disabled</h3>
      <GoATextArea name="comment-disabled"
        value={value4}
        onChange={onChange4}
        disabled={true}></GoATextArea>

      <h3>Placeholder</h3>
      <GoATextArea
        placeholder="Tell us what you think.."
        name="comment"
        value={value5}
        onChange={onChange5}
      ></GoATextArea>

      <h3>Rows</h3>
      <GoATextArea rows={4} name="comment"
        value={value6}
        onChange={onChange6}
      ></GoATextArea>

      <h3>Error state</h3>
      <GoATextArea
        error={true} name="comment"
        value={value7}
        onChange={onChange7}
      ></GoATextArea>
    </>
  );
}
