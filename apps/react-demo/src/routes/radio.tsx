import * as React from "react";
import { GoARadioGroup, GoARadioItem } from "@abgov/react-components";

export default function Radio() {
  function onChange(name: string, value: string) {
    console.log("onChange", name, value);
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
      <h1>Radio Button</h1>
      <h2>Basic</h2>
      <GoARadioGroup name="color" value="orange" onChange={onChange}>
        <GoARadioItem name="color" value="red"></GoARadioItem>
        <GoARadioItem name="color" value="blue"></GoARadioItem>
        <GoARadioItem name="color" value="orange"></GoARadioItem>
      </GoARadioGroup>

      <h2>Error</h2>
      <GoARadioGroup name="color2" value="orange" error onChange={onChange}>
        <GoARadioItem name="color2" value="red"></GoARadioItem>
        <GoARadioItem name="color2" value="blue"></GoARadioItem>
        <GoARadioItem name="color2" value="orange"></GoARadioItem>
      </GoARadioGroup>

      <h2>Label</h2>
      <GoARadioGroup name="color3" value="orange" onChange={onChange}>
        <GoARadioItem name="color3" label="Red" value="red"></GoARadioItem>
        <GoARadioItem name="color3" label="Blue" value="blue"></GoARadioItem>
        <GoARadioItem
          name="color3"
          label="Orange"
          value="orange"
        ></GoARadioItem>
      </GoARadioGroup>

      <h2>Disabled</h2>
      <GoARadioGroup name="color4" value="orange" disabled onChange={onChange}>
        <GoARadioItem name="color4" value="red"></GoARadioItem>
        <GoARadioItem name="color4" value="blue"></GoARadioItem>
        <GoARadioItem name="color4" value="orange"></GoARadioItem>
      </GoARadioGroup>

      <h2>Orientation</h2>
      <GoARadioGroup
        name="color5"
        value="orange"
        orientation="horizontal"
        onChange={onChange}
      >
        <GoARadioItem name="color5" value="red"></GoARadioItem>
        <GoARadioItem name="color5" value="blue"></GoARadioItem>
        <GoARadioItem name="color5" value="orange"></GoARadioItem>
      </GoARadioGroup>

      <h2>Dynamic</h2>
      {dynamicItems.map((item) => (
        <div>
          <h4>{item.name}</h4>
          <GoARadioGroup
            key={item.name}
            name={item.name}
            value={item.value}
            onChange={onChange}
          >
            {item.options.map((option) => (
              <GoARadioItem
                key={option.value}
                value={option.value}
                name={item.name}
                label={option.value}
              />
            ))}
          </GoARadioGroup>
        </div>
      ))}
    </>
  );
}
