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

export interface GoabDropdownItemProps {
  value: string;
  label?: string;
  filter?: string;
  testId?: string;
  mountType?: DropdownItemMountType;

  // @deprecated
  name?: string;
}

export function GoabDropdownOption(props: GoabDropdownItemProps) {
  useEffect(() => {
    console.warn("GoABDropdownOption is deprecated. Please use GoABDropdownItem");
  }, []);

  return <GoabDropdownItem {...props} />;
}

export function GoabDropdownItem({ value, label, filter, name, testId, mountType = "append" }: GoabDropdownItemProps) {
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
