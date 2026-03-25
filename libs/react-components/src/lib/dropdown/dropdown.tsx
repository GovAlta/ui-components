import {
  GoabDropdownOnChangeDetail,
  GoabIconType,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  arialabel?: string;
  arialabelledby?: string;
  disabled?: string;
  error?: string;
  filterable?: string;
  leadingicon?: string;
  maxheight?: string;
  multiselect?: string;
  name?: string;
  native?: string;
  placeholder?: string;
  value?: string;
  width?: string;
  maxwidth?: string;
  relative?: string;
  id?: string;
  autocomplete?: string;
  testid?: string;
}

export interface GoabDropdownProps extends Margins, DataAttributes {
  /**
   * Identifier for the dropdown. Should be unique.
   * @required
   */
  name?: string;
  /**
   * Stores the value of the item selected from the dropdown.
   * @default ""
   */
  value?: string[] | string;
  onChange?: (detail: GoabDropdownOnChangeDetail) => void;

  // optional
  /**
   * Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name.
   * @default ""
   */
  ariaLabel?: string;
  /**
   * The aria-labelledby attribute identifies the element(or elements) that labels the dropdown it is applied to. Normally it is the id of the label.
   * @default ""
   */
  ariaLabelledBy?: string;
  id?: string;
  /** TO REVIEW: Dropdown item elements rendered inside the dropdown. */
  children?: React.ReactNode;
  /**
   * Disable this control.
   * @default false
   */
  disabled?: boolean;
  /**
   * Show an error state.
   * @default false
   */
  error?: boolean;
  /**
   * When true the dropdown will have the ability to filter options by typing into the input field.
   * @default false
   */
  filterable?: boolean;
  /** Icon shown to the left of the dropdown input. */
  leadingIcon?: GoabIconType;
  /**
   * Maximum height of the dropdown menu. Non-native only.
   * @default "276px"
   */
  maxHeight?: string;
  multiselect?: boolean;
  /**
   * When true will render the native select HTML element.
   * @default false
   */
  native?: boolean;
  /**
   * The text displayed for the dropdown before a selection is made. Non-native only.
   * @default ""
   */
  placeholder?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Overrides the autosized menu width. Non-native only.
   * @default ""
   */
  width?: string;
  /**
   * Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em).
   * @default ""
   */
  maxWidth?: string;
  /**
   * Specifies the autocomplete attribute for the dropdown input. Native only.
   * @default ""
   */
  autoComplete?: string;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  relative?: boolean;
}

function stringify(value: string | string[] | undefined): string {
  if (typeof value === "undefined") {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

export function GoabDropdown({
  value,
  onChange,
  disabled,
  error,
  filterable,
  multiselect,
  native,
  relative,
  children,
  ...rest
}: GoabDropdownProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<GoabDropdownOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };
    if (onChange) {
      current.addEventListener("_change", handler);
    }
    return () => {
      if (onChange) {
        current.removeEventListener("_change", handler);
      }
    };
  }, [el, onChange]);

  return (
    <goa-dropdown
      ref={el}
      value={stringify(value)}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      filterable={filterable ? "true" : undefined}
      multiselect={multiselect ? "true" : undefined}
      native={native ? "true" : undefined}
      relative={relative ? "true" : undefined}
      {..._props}
    >
      {children}
    </goa-dropdown>
  );
}

export default GoabDropdown;
