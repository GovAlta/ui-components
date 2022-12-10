import React from "react";

interface WCProps {
  value: string;
  label?: string;

  // @deprecated
  name?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-dropdown-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  value: string;
  label?: string;
  testId?: string;

  // @deprecated
  name?: string;
}

export function GoADropdownOption({ value, label, name, testId }: Props) {
  return (
    <goa-dropdown-item
      data-testid={testId}
      value={value}
      label={label}
      name={name}
    />
  );
}

export default GoADropdownOption;
