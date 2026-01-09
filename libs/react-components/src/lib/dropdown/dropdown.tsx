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

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-dropdown": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabDropdownProps extends Margins, DataAttributes {
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
