import React, { FC } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-dropdown-item": DropdownOptionProps &
        React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface DropdownOptionProps {
  name: string;
  value: string;
  label?: string;
}

interface Props {
  name: string;
  value: string;
  label?: string;
  testId?: string;
}

export const GoADropdownOption: FC<Props> = (props) => {
  return (
    <goa-dropdown-item
      data-testid={props.testId}
      name={props.name}
      value={props.value}
      label={props.label}
    >
      {props.children}
    </goa-dropdown-item>
  );
};

export default GoADropdownOption;
