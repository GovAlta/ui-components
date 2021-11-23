import React, { FC, useEffect, useRef } from 'react';
import 'goa-web-components'

interface CheckboxProps {
  ref: React.MutableRefObject<HTMLElement>;
  name: string;
  ischecked?: string;
  isdisabled?: string;
  isindeterminate?: string;
  iserror?: string;
  content?: string;
  value?: string | number | boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      'goa-checkbox': CheckboxProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

/* eslint-disable-next-line */
export interface Props {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  content?: string;
  value?: string | number | boolean;
  testId?: string;
  onChange?: (name: string, value: string) => void;
}

export const GoACheckbox: FC<Props> = ({ name, testId, error, checked, disabled, indeterminate, value = true, content, children, onChange }) => {
  const el = useRef<HTMLElement>();
  useEffect(() => {
    el.current.addEventListener('on:change', (e: CustomEvent) => {
      onChange(name, e.detail.value)
    });
  }, [])

  return (
    <goa-checkbox ref={el} name={name} iserror={error && 'error'} ischecked={checked && 'checked'} isdisabled={disabled && 'disabled'} isindeterminate={indeterminate && 'indeterminate'} content={content} value={value}>{children}</goa-checkbox>
  )
};

export default GoACheckbox;
