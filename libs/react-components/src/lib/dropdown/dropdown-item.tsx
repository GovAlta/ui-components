import { useEffect } from "react";

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

export interface ABGovDropdownItemProps {
  value: string;
  label?: string;
  filter?: string;
  testId?: string;

  // @deprecated
  name?: string;
}

export function ABGovDropdownOption(props: ABGovDropdownItemProps) {
  useEffect(() => {
    console.warn("ABGovDropdownOption is deprecated. Please use ABGovDropdownItem");
  }, []);

  return <ABGovDropdownItem {...props} />;
}

export function ABGovDropdownItem({ value, label, filter, name, testId }: ABGovDropdownItemProps) {
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
