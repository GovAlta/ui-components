import React, { useEffect } from "react";

interface WCProps {
  value: string;
  label?: string;
  filter?: string;

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
  filter?: string;
  testId?: string;

  // @deprecated
  name?: string;
}

export function GoADropdownOption(props: Props) {
  useEffect(() => {
    console.warn("GoADropdownOption is deprecated. Please use GoADropdownItem");
  }, []);

  return <GoADropdownItem {...props} />;
}

export function GoADropdownItem({ value, label, filter, name, testId }: Props) {
  return (
    <goa-dropdown-item
      data-testid={testId}
      value={value}
      label={label}
      filter={filter}
      name={name}
    />
  );
}
