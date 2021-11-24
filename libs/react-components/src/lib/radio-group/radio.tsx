import React, { FC } from 'react';
import 'goa-web-components';

interface RadioItemProps {
  name: string;
  value: string;
  label: string;
  isdisabled: string;
  ischecked: string;
  iserror: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-radio-item': RadioItemProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  value: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
  testId?: string;
}

export const GoARadio: FC<Props> = ({ name, label, value, disabled, checked, error, testId, children }) => {
  return (
    <goa-radio-item
      name={name}
      label={label}
      value={value}
      iserror={error && 'error'}
      isdisabled={disabled && 'disabled'}
      ischecked={checked && 'checked'}
      data-testid={testId}
    >
      {children}
    </goa-radio-item>
  );
};

export default GoARadio;
