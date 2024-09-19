import { useEffect } from "react";

interface WCProps {
  value: string;
  label?: string;
  filter?: string;
  mount?: DropdownItemMountType;
  parent?: string;

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

export interface GoADropdownItemProps {
  value: string;
  label?: string;
  filter?: string;
  testId?: string;
  mountType?: DropdownItemMountType;
  parent?: string;

  // @deprecated
  name?: string;
}

export function GoADropdownOption(props: GoADropdownItemProps) {
  useEffect(() => {
    console.warn("GoADropdownOption is deprecated. Please use GoADropdownItem");
  }, []);

  return <GoADropdownItem {...props} />;
}

export function GoADropdownItem({
  value,
  label,
  filter,
  name,
  testId,
  mountType = "append",
  parent,
}: GoADropdownItemProps) {
  return (
    <goa-dropdown-item
      data-testid={testId}
      value={value}
      label={label}
      filter={filter}
      name={name}
      mount={mountType}
      parent={parent}
    />
  );
}
