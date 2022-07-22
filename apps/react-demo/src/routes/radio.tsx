import * as React from 'react';
import { GoARadioGroup, GoARadioItem } from "@abgov/react-components";

export default function Radio() {

  function onChange(name: string, value: string) {
    console.log('onChange', name, value);
  }

  return (
    <>
      <h3>Basic</h3>
      <GoARadioGroup name="color" value="orange" onChange={onChange}>
        <GoARadioItem name="color" value="red"></GoARadioItem>
        <GoARadioItem name="color" value="blue"></GoARadioItem>
        <GoARadioItem name="color" value="orange"></GoARadioItem>
      </GoARadioGroup >

      <h3>Error</h3>
      <GoARadioGroup name="color2" value="orange" error onChange={onChange}>
        <GoARadioItem name="color2" value="red"></GoARadioItem>
        <GoARadioItem name="color2" value="blue"></GoARadioItem>
        <GoARadioItem name="color2" value="orange"></GoARadioItem>
      </GoARadioGroup >

      <h3>Label</h3>
      <GoARadioGroup name="color3" value="orange" onChange={onChange}>
        <GoARadioItem name="color3" label="Red" value="red"></GoARadioItem>
        <GoARadioItem name="color3" label="Blue" value="blue"></GoARadioItem>
        <GoARadioItem name="color3" label="Orange" value="orange"></GoARadioItem>
      </GoARadioGroup >

      <h3>Disabled</h3>
      <GoARadioGroup name="color4" value="orange" disabled onChange={onChange}>
        <GoARadioItem name="color4" value="red"></GoARadioItem>
        <GoARadioItem name="color4" value="blue"></GoARadioItem>
        <GoARadioItem name="color4" value="orange"></GoARadioItem>
      </GoARadioGroup >

      <h3>Orientation</h3>
      <GoARadioGroup name="color5" value="orange" orientation="horizontal" onChange={onChange}>
        <GoARadioItem name="color5" value="red"></GoARadioItem>
        <GoARadioItem name="color5" value="blue"></GoARadioItem>
        <GoARadioItem name="color5" value="orange"></GoARadioItem>
      </GoARadioGroup >

    </>
  );
}
