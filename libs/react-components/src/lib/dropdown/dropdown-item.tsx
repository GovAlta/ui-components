import { useEffect } from "react";
import { GoabDropdownItemMountType } from "@abgov/ui-components-common";

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
