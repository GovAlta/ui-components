import { GoAInput } from '@abgov/react-components';
import * as React from 'react';
import { useState } from 'react';

export default function Input() {

  const [value, setValue] = useState('');
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

  function handleTrailingIconClick() {
    console.log('handleTrailingIconClick');
  }

  return (
    <>
      <h3>Basic</h3>
      <GoAInput
        name="foo"
        value={value}
        type="text"
        onChange={onChange}></GoAInput>

      <h3>Icons</h3>
      <GoAInput
        name="foo2"
        value={value2}
        onChange={onChange2}
        type="text"
        leadingIcon="finger-print"></GoAInput>

      <GoAInput
        name="foo3"
        value={value3}
        onChange={onChange3}
        type="text"
        trailingIcon="finger-print"></GoAInput>

      <h3>Icon Buttons</h3>
      <GoAInput
        trailingIcon="finger-print"
        name="foo4"
        value={value4}
        onChange={onChange4}
        type="text"
        onTrailingIconClick={handleTrailingIconClick}></GoAInput>

      <h3>Disabled</h3>
      <GoAInput
        name="foo5"
        value={value5}
        onChange={onChange5}
        type="text"
        disabled={true} placeholder="Find by name"></GoAInput>

      <h3>Error state</h3>
      <GoAInput
        name="foo6"
        value={value6}
        onChange={onChange6}
        type="text"
        error={true}></GoAInput>

      <h3>Focus</h3>
      <GoAInput
        name="foo7"
        value={value7}
        onChange={onChange7}
        type="text"
      ></GoAInput>

      <h3>Character count</h3>
      <GoAInput
        name="firstname"
        value={value8}
        onChange={onChange8}
        type="text"
        maxCharCount={20}></GoAInput>

      <h3>Character count with limit</h3>
      <GoAInput
        name="firstname"
        value={value9}
        onChange={onChange9}
        type="text"
        showCounter={true}
        maxCharCount={20}></GoAInput>
    </>
  );
}

