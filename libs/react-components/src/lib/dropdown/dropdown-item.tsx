import { ReactNode, useEffect } from "react";
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
  /** Additional text used to match this item in typeahead search, alongside the label. Defaults to the children's text. */
  filter?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Controls how the item is registered with the parent dropdown. */
  mountType?: GoabDropdownItemMountType;
  /** Rich content rendered for this item in the dropdown menu. When set, `label` is shown in the dropdown input on selection and `filter` defaults to the content's text. */
  children?: ReactNode;
  /** @deprecated */
  name?: string;
}

/** Present a list of options to the user to select from. */
export function GoabDropdownOption(props: GoabDropdownItemProps) {
  useEffect(() => {
    console.warn("GoabDropdownOption is deprecated. Please use GoabDropdownItem");
  }, []);

  return <GoabDropdownItem {...props} />;
}

/** Present a list of options to the user to select from. */
export function GoabDropdownItem({
  value,
  label,
  filter,
  name,
  mountType = "append",
  children,
}: GoabDropdownItemProps) {
  return (
    <goa-dropdown-item
      value={value}
      label={label}
      filter={filter}
      name={name}
      mount={mountType}
    >
      {children}
    </goa-dropdown-item>
  );
}
