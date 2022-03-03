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
  ref: React.RefObject<HTMLElement>;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
}

/* eslint-disable-next-line */
export interface Props {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  text?: string;
  value?: string | number | boolean;
  testId?: string;
  onChange?: (name: string, checked: boolean, value: string) => void;
}

export const GoACheckbox: FC<Props> = ({ name, testId, error, disabled, checked, value = true, text, children, onChange }) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: any) => {
      onChange?.(name, e.detail.checked, e.detail.value);
    };

    current.addEventListener('_change', listener)

    return () => {
      current.removeEventListener('_change', listener);
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
      text={text}
      value={value}
    >
      {children}
    </goa-checkbox>
  )
};

export default GoACheckbox;
