import React, { FC, useEffect, useRef } from "react";
import { GoAIconType } from "../icons";

export * from './dropdown-option';

interface WCProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  name: string;
  values: string;
  leadingicon?: string;
  maxheight?: number;
  placeholder?: string;
  filterable?: boolean;
  disabled?: boolean;
  error?: boolean;
  multiselect?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      'goa-dropdown': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  name: string;
  values: string[]
  onChange: (name: string, values: string[]) => void;

  // optional
  disabled?: boolean;
  filterable?: boolean;
  leadingIcon?: GoAIconType,
  maxHeight?: number;
  error?: boolean;
  multiselect?: boolean;
  placeholder?: string;
  testId?: string;
}

export const GoADropdown: FC<Props> = (props) => {

  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const handler = (state: any) => {
      const { name, value } = state.detail;
      props.onChange(name, value);
    };
    current.addEventListener('_change', handler);
    return () => {
      current.removeEventListener('_change', handler);
    }
  }, [el, props])

  return (
    <goa-dropdown
      ref={el}
      name={props.name}
      values={JSON.stringify(props.values)}
      leadingicon={props.leadingIcon}
      maxheight={props.maxHeight}
      placeholder={props.placeholder}
      filterable={props.filterable}
      disabled={props.disabled}
      multiselect={props.multiselect}
      error={props.error}
      data-testid={props.testId}
    >
      {props.children}
    </goa-dropdown>
  );
}

export default GoADropdown;
