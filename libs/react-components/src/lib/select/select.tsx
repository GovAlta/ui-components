import React, { ReactNode, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement>;
  name: string;
  value?: string;
  disabled?: boolean;
  arialabel?: string;
  width?: string;
  error?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-select": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface SelectProps extends Margins {
  name: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  ariaLabel?: string;
  width?: string;
  children?: ReactNode;
  onChange: (name: string, value: string) => void;
}

export function GoASelect({
  name,
  value,
  disabled,
  error,
  ariaLabel,
  width,
  children,
  onChange,
  mt,
  mr,
  mb,
  ml,
}: SelectProps) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    const listener = (e: unknown) => {
      if (!onChange) {
        console.warn("Missing onChange function");
        return;
      }
      onChange(name, (e as CustomEvent).detail.value);
    };
    const currentEl = el.current;
    currentEl.addEventListener("_change", listener);
    return () => {
      currentEl.removeEventListener("_change", listener);
    };
  }, [name, onChange]);

  return (
    <goa-select
      ref={el}
      name={name}
      value={value}
      disabled={disabled}
      error={error}
      arialabel={ariaLabel}
      width={width}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-select>
  );
}

export default GoASelect;
