import React, { FC, useEffect, useRef } from "react";
import { GoAIconType } from "../icons";

export * from "./dropdown-option";

interface WCProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  name: string;
  value: string;
  leadingicon?: string;
  maxheight?: string;
  placeholder?: string;
  filterable?: boolean;
  disabled?: boolean;
  error?: boolean;
  multiselect?: boolean;
  width?: string;
  testid?: string;
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

interface Props {
  name: string;
  value: string[] | string;
  onChange: (name: string, values: string[] | string) => void;

  // optional
  disabled?: boolean;
  filterable?: boolean;
  leadingIcon?: GoAIconType;
  maxHeight?: string;
  error?: boolean;
  multiselect?: boolean;
  placeholder?: string;
  testId?: string;
  width?: string;
  children?: React.ReactNode;
}

export const GoADropdown: FC<Props> = (props) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const handler = (state: any) => {
      const { name, value, values } = state.detail;
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
      value={JSON.stringify(props.value)}
      leadingicon={props.leadingIcon}
      maxheight={props.maxHeight}
      placeholder={props.placeholder}
      filterable={props.filterable}
      disabled={props.disabled}
      multiselect={props.multiselect}
      error={props.error}
      testid={props.testId}
      width={props.width}
    >
      {props.children}
    </goa-dropdown>
  );
};

export default GoADropdown;
