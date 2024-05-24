import { useEffect } from "react";

interface WCProps {
  value: string;
  label?: string;
  filter?: string;
  mount?: DropdownItemMountType;

  // @deprecated
  name?: string;
}

export type DropdownItemMountType = "append" | "prepend" | "reset";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-dropdown-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABDropdownItemProps {
  value: string;
  label?: string;
  filter?: string;
  testId?: string;
  mountType?: DropdownItemMountType;

  // @deprecated
  name?: string;
}

export function GoABDropdownOption(props: GoABDropdownItemProps) {
  useEffect(() => {
    console.warn("GoABDropdownOption is deprecated. Please use GoABDropdownItem");
  }, []);

  return <GoABDropdownItem {...props} />;
}

export function GoABDropdownItem({ value, label, filter, name, testId, mountType = "append" }: GoABDropdownItemProps) {
  return (
    <goa-dropdown-item
      data-testid={testId}
      value={value}
      label={label}
      filter={filter}
      name={name}
      mount={mountType}
    />
  );
}
