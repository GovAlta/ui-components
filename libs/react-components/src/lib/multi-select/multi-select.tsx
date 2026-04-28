import {
  GoabDropdownOnChangeDetail,
  GoabDropdownSize,
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
  maxheight?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  width?: string;
  maxwidth?: string;
  testid?: string;
  size?: GoabDropdownSize;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-multi-select": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabMultiSelectProps extends Margins, DataAttributes {
  name?: string;
  value?: string[];
  onChange?: (detail: GoabDropdownOnChangeDetail) => void;

  // optional
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  maxHeight?: string;
  placeholder?: string;
  testId?: string;
  width?: string;
  maxWidth?: string;
  size?: GoabDropdownSize;
}

export function GoabMultiSelect({
  value,
  onChange,
  disabled,
  error,
  children,
  size = "default",
  ...rest
}: GoabMultiSelectProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ size, ...rest }, lowercase);

  useEffect(() => {
    if (!el.current) return;
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
    <goa-multi-select
      ref={el}
      value={value ? JSON.stringify(value) : ""}
      disabled={disabled ? "true" : undefined}
      error={error ? "true" : undefined}
      {..._props}
      version="2"
    >
      {children}
    </goa-multi-select>
  );
}

export default GoabMultiSelect;
