import React, { FC, useEffect, useRef } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
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
  text?: string;
  value?: string | number | boolean;
}

/* eslint-disable-next-line */
export interface Props {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  testId?: string;
  onChange?: (name: string, checked: boolean, value: string) => void;
}

export const GoACheckbox: FC<Props> = ({ name, testId, error, disabled, checked, indeterminate, value = true, text, children, onChange }) => {
  const el = useRef<HTMLElement>();
  useEffect(() => {
    const current = el.current;
    const listener = (e: CustomEvent) => {
      onChange(name, e.detail.checked, e.detail.value);
    };

    current.addEventListener('on:change', listener)

    return () => {
      current.removeEventListener('on:change', listener);
    }
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
      text={text}
      value={value}
    >
      {children}
    </goa-checkbox>
  )
};

export default GoACheckbox;
