import React, { FC, useEffect, useRef } from "react";
import 'goa-web-components'

export * from './dropdown-option';

interface DropdownProps {
  ref: React.MutableRefObject<HTMLElement>;
  name: string;
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
  onChange: (name: string, value: string[]) => void;
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
    <goa-dropdown ref={el} name={props.name}>{props.children}</goa-dropdown>
  );
}

export default GoADropdown;
