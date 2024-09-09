import { useEffect } from "react";
import { GoabDropdownItemMountType } from "@abgov/ui-components-common";

interface WCProps {
  value: string;
  label?: string;
  filter?: string;
  mount?: GoabDropdownItemMountType;

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

export interface GoabDropdownItemProps {
  value: string;
  label?: string;
  filter?: string;
  testId?: string;
  mountType?: GoabDropdownItemMountType;

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
