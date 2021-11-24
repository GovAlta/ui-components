import React, { FC, useEffect, useRef } from 'react';
import 'goa-web-components';

export * from './radio';

interface RadioGroupProps {
  ref: React.MutableRefObject<HTMLElement>;
  name: string;
  value: string;
  orientation: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-radio-group': RadioGroupProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  name: string;
  value?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  testId?: string;
  onChange: (name: string, value: string) => void;
}

export const GoARadioGroup: FC<Props> = ({
  name,
  value,
  children,
  orientation = 'vertical',
  testId,
  onChange,
}) => {

  const el = useRef<HTMLElement>()

  useEffect(() => {
    const listener = (e) => {
      onChange(name, e.detail.value);
    }
    const currentEl = el.current;
    currentEl.addEventListener("on:change", listener);
    return () => {
      currentEl.removeEventListener("on:change", listener);
    }
  }, [])

  return (
    <goa-radio-group data-testid={testId} ref={el} name={name} value={value} orientation={orientation}>
      {children}
    </goa-radio-group>
  );
};

export default GoARadioGroup;
