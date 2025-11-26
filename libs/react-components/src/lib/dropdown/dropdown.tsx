import {
  GoabDropdownOnChangeDetail,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
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
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-dropdown": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDropdownProps extends Margins, DataGridProps {
  name?: string;
  value?: string[] | string;
  onChange?: (detail: GoabDropdownOnChangeDetail) => void;

  // optional
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  filterable?: boolean;
  leadingIcon?: GoabIconType;
  maxHeight?: string;
  multiselect?: boolean;
  native?: boolean;
  placeholder?: string;
  testId?: string;
  width?: string;
  maxWidth?: string;
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

export function GoabDropdown(props: GoabDropdownProps): JSX.Element {
  const [
    dataGridProps,
    {
      name,
      value,
      onChange,
      ariaLabel,
      ariaLabelledBy,
      id,
      children,
      disabled,
      error,
      filterable,
      leadingIcon,
      maxHeight,
      multiselect,
      native,
      placeholder,
      testId,
      width,
      maxWidth,
      autoComplete,
      relative,
      mb,
      ml,
      mr,
      mt,
    },
  ] = useDataGridProps(props);

  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<GoabDropdownOnChangeDetail>).detail;
      onChange?.(detail);
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
      name={name}
      value={stringify(value)}
      arialabel={ariaLabel}
      arialabelledby={ariaLabelledBy}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      filterable={filterable ? "true" : undefined}
      leadingicon={leadingIcon}
      maxheight={maxHeight}
      mb={mb}
      ml={ml}
      mr={mr}
      mt={mt}
      multiselect={multiselect ? "true" : undefined}
      native={native ? "true" : undefined}
      placeholder={placeholder}
      testid={testId}
      width={width}
      maxwidth={maxWidth}
      relative={relative ? "true" : undefined}
      autocomplete={autoComplete}
      id={id}
      {...dataGridProps}
    >
      {children}
    </goa-dropdown>
  );
}

export default GoabDropdown;
