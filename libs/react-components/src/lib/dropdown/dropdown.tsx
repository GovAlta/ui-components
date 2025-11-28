import {
  GoabDropdownOnChangeDetail,
  GoabIconType,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { useEffect, useRef, type JSX } from "react";
import { extractProps } from "../common/extract-props";

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
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["value", "onChange", "disabled", "error", "filterable", "multiselect", "native", "relative"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<GoabDropdownOnChangeDetail>).detail;
      props.onChange?.(detail);
    };
    if (props.onChange) {
      current.addEventListener("_change", handler);
    }
    return () => {
      if (props.onChange) {
        current.removeEventListener("_change", handler);
      }
    };
  }, [el, props.onChange]);

  return (
    <goa-dropdown
      ref={el}
      value={stringify(props.value)}
      disabled={props.disabled ? "true" : undefined}
      error={props.error ? "true" : undefined}
      filterable={props.filterable ? "true" : undefined}
      multiselect={props.multiselect ? "true" : undefined}
      native={props.native ? "true" : undefined}
      relative={props.relative ? "true" : undefined}
      {..._props}
    >
      {props.children}
    </goa-dropdown>
  );
}

export default GoabDropdown;
