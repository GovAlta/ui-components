import React, { FC, useEffect, useRef } from "react";
import { GoAIconType } from "../icons";

export * from './dropdown-option';

interface DropdownProps {
  ref: React.MutableRefObject<HTMLElement>;
  name: string;
  values: string;
  leadingicon: string;
  maxheight: number;
  placeholder: string;
  autocomplete: boolean;
  disabled: boolean;
  multiselect: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      'goa-dropdown': DropdownProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  name: string;
  selectedValues: string[]
  onChange: (name: string, values: string[]) => void;

  // optional
  disabled?: boolean;
  autoComplete?: boolean;
  leadingIcon?: GoAIconType,
  maxHeight?: number;
  multiSelect?: boolean;
  placeholder?: string;
  testId?: string;
}

export const GoADropdown: FC<Props> = (props) => {

  const el = useRef<HTMLElement>();
  useEffect(() => {
    if (!el.current) {
      return null;
    }
    const current = el.current;
    const handler = (state: CustomEvent) => {
      const { name, value } = state.detail.data;
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
      values={JSON.stringify(props.selectedValues)}
      leadingicon={props.leadingIcon}
      maxheight={props.maxHeight}
      placeholder={props.placeholder}
      autocomplete={props.autoComplete}
      disabled={props.disabled}
      multiselect={props.multiSelect}
      data-testid={props.testId}
    >
      {props.children}
    </goa-dropdown>
  );
}

export default GoADropdown;
