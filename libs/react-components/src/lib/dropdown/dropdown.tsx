import {
  GoabDropdownOnChangeDetail,
  GoabDropdownSize,
  GoabIconType,
  Margins,
  DataAttributes,
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
  size?: GoabDropdownSize;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-dropdown": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabDropdownProps extends Margins, DataAttributes {
  /** Identifier for the dropdown. Should be unique. */
  name?: string;
  /** The currently selected value(s) of the dropdown. */
  value?: string[] | string;
  /** Callback fired when the selected value changes. */
  onChange?: (detail: GoabDropdownOnChangeDetail) => void;
  /** Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name. */
  ariaLabel?: string;
  /** The aria-labelledby attribute identifies the element that labels the dropdown. Normally it is the id of the label. */
  ariaLabelledBy?: string;
  /** The id attribute for the dropdown element. */
  id?: string;
  /** Dropdown items rendered inside the dropdown. */
  children?: React.ReactNode;
  /** Disables the dropdown control. */
  disabled?: boolean;
  /** Shows an error state on the dropdown. */
  error?: boolean;
  /** When true, allows filtering options by typing into the input field. */
  filterable?: boolean;
  /** Icon shown to the left of the dropdown input. */
  leadingIcon?: GoabIconType;
  /** Maximum height of the dropdown menu. Non-native only. @default "276px" */
  maxHeight?: string;
  /** When true, allows multiple items to be selected. */
  multiselect?: boolean;
  /** When true, renders the native select HTML element. */
  native?: boolean;
  /** The text displayed in the dropdown before a selection is made. Non-native only. */
  placeholder?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Overrides the autosized menu width. Non-native only. */
  width?: string;
  /** Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em). */
  maxWidth?: string;
  /** Specifies the autocomplete attribute for the dropdown input. Native only. */
  autoComplete?: string;
  /** Sets the size of the dropdown. Compact reduces height for dense layouts. */
  size?: GoabDropdownSize;
  /** @deprecated This property has no effect and will be removed in a future version. */
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

/** Present a list of options to the user to select from. */
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
  size = "default",
  ...rest
}: GoabDropdownProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ size, ...rest }, lowercase);

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
      version="2"
    >
      {children}
    </goa-dropdown>
  );
}

export default GoabDropdown;
