import {
  GoabDropdownMultiselectLabelFormatOptions,
  GoabDropdownMultiselectOnChangeDetail,
  GoabDropdownMultiselectSize,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  name: string;
  value?: string[];
  placeholder?: string;
  disabled?: string;
  error?: string;
  filterable?: string;
  leadingIcon?: string;
  testid?: string;
  arialabel?: string;
  arialabelledby?: string;
  maxheight?: string;
  width?: string;
  size?: GoabDropdownMultiselectSize;
  "truncate-label"?: string;
  "show-select-all"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-dropdown-multiselect": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDropdownMultiselectProps extends Margins {
  /** @required Identifier for the group. Used in change events. */
  name: string;
  /** Array of currently selected checkbox value. */
  value?: string[];
  /** Text shown when nothing is selected. */
  placeholder?: string;
  /** Enables filtering of options by typing in the trigger. */
  filterable?: boolean;
  /** Icon shown to the left of the dropdown input. */
  leadingIcon?: GoabIconType;
  /** Disables the component.  @default false */
  disabled?: boolean;
  /** Shows an error state.  @default false */
  error?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Provides an accessible label when no visible label is associated. */
  ariaLabel?: string;
  /** References an external element that labels this component. */
  ariaLabelledBy?: string;
  /** Sets the maximum height of the dropdown content area. @default "276px" */
  maxHeight?: string;
  /** Sets a fixed width for the component and popover panel. */
  width?: string;
  /** Sets the size variant. @default "default" */
  size?: GoabDropdownMultiselectSize;
  /** The display label format of the closed dropdown. When 'count' the display label shows only "n items" in the label, when 'list' it shows a comma separated list of selected item labels. @default "list" */
  labelFormat?: GoabDropdownMultiselectLabelFormatOptions;
  /** Shows a "Select All" checkbox at the top of the options list. @default false */
  showSelectAll?: boolean;
  /** Dropdown items rendered inside the component (GoabDropdownItem elements). */
  children?: React.ReactNode;
  /** Callback fired when the selected value change. */
  onChange?: (detail: GoabDropdownMultiselectOnChangeDetail) => void;
}

/** A dropdown that presents a list of checkboxes for multiple selection. */
export function GoabDropdownMultiselect({
  name,
  value = [],
  placeholder,
  disabled,
  error,
  filterable,
  leadingIcon,
  showSelectAll,
  testId,
  ariaLabel,
  ariaLabelledBy,
  maxHeight,
  width,
  size = "default",
  labelFormat,
  children,
  onChange,
  mt,
  mr,
  mb,
  ml,
}: GoabDropdownMultiselectProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabDropdownMultiselectOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };

    current.addEventListener("_change", listener);

    return () => {
      current.removeEventListener("_change", listener);
    };
  }, [onChange]);

  return (
    <goa-dropdown-multiselect
      ref={el}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      filterable={filterable ? "true" : undefined}
      leading-icon={leadingIcon}
      testid={testId}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      max-height={maxHeight}
      width={width}
      size={size}
      label-format={labelFormat ? labelFormat : undefined}
      show-select-all={showSelectAll ? "true" : undefined}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-dropdown-multiselect>
  );
}

export default GoabDropdownMultiselect;
