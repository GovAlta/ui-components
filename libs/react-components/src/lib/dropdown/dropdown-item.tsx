import { useEffect } from "react";
import { GoabDropdownItemMountType } from "@abgov/ui-components-common";

export interface GoabDropdownItemProps {
  /**
   * Stores the value of the item selected from the dropdown.
   * @default ""
   */
  value: string;
  label?: string;
  filter?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  mountType?: GoabDropdownItemMountType;

  // @deprecated
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
