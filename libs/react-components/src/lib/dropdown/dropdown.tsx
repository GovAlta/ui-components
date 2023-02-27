import React, { FC, useEffect, useRef } from "react";
import { Margins } from "../../common/styling";
import { GoAIconType } from "../icon/icon";

interface WCProps extends Margins {
  ref: React.MutableRefObject<HTMLElement | null>;
  arialabel?: string;
  disabled?: boolean;
  error?: boolean;
  filterable?: boolean;
  leadingicon?: string;
  maxheight?: string;
  multiselect?: boolean;
  name?: string;
  native?: boolean;
  placeholder?: string;
  value?: string;
  width?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-dropdown": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props extends Margins {
  name?: string;
  value?: string[] | string;
  onChange: (name: string, values: string[] | string) => void;

  // optional
  ariaLabel?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  filterable?: boolean;
  leadingIcon?: GoAIconType;
  maxHeight?: string;
  multiselect?: boolean;
  native?: boolean;
  placeholder?: string;
  testId?: string;
  width?: string;
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

export const GoADropdown: FC<Props> = (props) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const handler = (e: unknown) => {
      const { name, value, values } = (e as CustomEvent).detail;
      props.onChange(name, props.multiselect ? values : value);
    };
    current.addEventListener("_change", handler);
    return () => {
      current.removeEventListener("_change", handler);
    };
  }, [el, props]);

  return (
    <goa-dropdown
      ref={el}
      name={props.name}
      value={stringify(props.value)}
      arialabel={props.ariaLabel}
      disabled={props.disabled}
      error={props.error}
      filterable={props.filterable}
      leadingicon={props.leadingIcon}
      maxheight={props.maxHeight}
      mb={props.mb}
      ml={props.ml}
      mr={props.mr}
      mt={props.mt}
      multiselect={props.multiselect}
      native={props.native}
      placeholder={props.placeholder}
      data-testid={props.testId}
      width={props.width}
    >
      {props.children}
    </goa-dropdown>
  );
};

export default GoADropdown;
