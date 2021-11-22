import { Props } from "@storybook/addon-docs/blocks";
import React, { FC } from "react";

interface Props {
  name: string;
  value: string;
  label?: string;
}

export const WCDropdownOption : FC<Props> = (props) => {
  return (
    <goa-dropdown-item name={props.name} value={props.value} label={props.label}>{props.children}</goa-dropdown-item>
  );
}

export default WCDropdownOption;
