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

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-dropdown-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabxDropdownItemProps {
  value: string;
  label?: string;
  filter?: string;
  testId?: string;
  mountType?: GoabDropdownItemMountType;

  // @deprecated
  name?: string;
}

export function GoabxDropdownOption(props: GoabxDropdownItemProps) {
  useEffect(() => {
    console.warn("GoabxDropdownOption is deprecated. Please use GoabxDropdownItem");
  }, []);

  return <GoabxDropdownItem {...props} />;
}

export function GoabxDropdownItem({
  value,
  label,
  filter,
  name,
  mountType = "append",
}: GoabxDropdownItemProps) {
  return (
    <goa-dropdown-item
      value={value}
      label={label}
      filter={filter}
      name={name}
      mount={mountType}
    />
  );
}
