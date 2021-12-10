import React, { FC, useEffect, useRef } from 'react';
import 'goa-web-components'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      'goa-checkbox': CheckboxProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface CheckboxProps {
  ref: React.MutableRefObject<HTMLElement>;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  content?: string;
  value?: string | number | boolean;
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
    <goa-checkbox
      data-testid={testId}
      ref={el}
      name={name}
      error={error}
      checked={checked}
      disabled={disabled}
      indeterminate={indeterminate}
      content={content}
      value={value}
    >
      {children}
    </goa-checkbox>
  )
};

export default GoACheckbox;
