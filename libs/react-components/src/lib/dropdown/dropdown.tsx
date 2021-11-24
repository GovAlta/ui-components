import React, { FC, useEffect, useRef } from "react";
import 'goa-web-components'
import { GoAIconType } from "../../experimental/icons";

export * from './dropdown-option';

interface DropdownProps {
  ref: React.MutableRefObject<HTMLElement>;
  name: string;
  values: string;
  leadingicon: string;
  maxheight: number;
  placeholder: string;
  isautocomplete: string;
  isdisabled: string;
  ismultiselect: string;
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
    el.current.addEventListener('on:change', (state: CustomEvent) => {
      const { name, value } = state.detail.data;
      props.onChange(name, value)
    })

  }, [el, props])

  return (
    <goa-dropdown
      ref={el}
      name={props.name}
      values={JSON.stringify(props.selectedValues)}
      leadingicon={props.leadingIcon}
      maxheight={props.maxHeight}
      placeholder={props.placeholder}
      isautocomplete={props.autoComplete && 'autocomplete'}
      isdisabled={props.disabled && 'disabled'}
      ismultiselect={props.multiSelect && 'multiselect'}
      data-testid={props.testId}
    >
      {props.children}
    </goa-dropdown>
  );
}

export default GoADropdown;
