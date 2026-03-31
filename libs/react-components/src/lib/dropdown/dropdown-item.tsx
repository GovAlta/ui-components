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

export interface GoabDropdownItemProps {
  /** @required The value submitted when this item is selected. */
  value: string;
  /** Display label for the dropdown item. */
  label?: string;
  /** Text used to filter and match this item in typeahead search. */
  filter?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Controls how the item is registered with the parent dropdown. */
  mountType?: GoabDropdownItemMountType;
  /** @deprecated */
  name?: string;
}

export function GoabDropdownOption(props: GoabDropdownItemProps) {
  useEffect(() => {
    console.warn("GoabDropdownOption is deprecated. Please use GoabDropdownItem");
  }, []);

  return <GoabDropdownItem {...props} />;
}

export function GoabDropdownItem({
  value,
  label,
  filter,
  name,
  mountType = "append",
}: GoabDropdownItemProps) {
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
