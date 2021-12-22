import React, { FC } from 'react';

interface WCProps {
  name: string;
  label: string;
  optional?: boolean;
  error?: string;
  helptext?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-form-item': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface GoAFormItemProps {
  name: string;
  label: string;
  optional?: boolean;
  error?: string;
  helpText?: string;
};

export const GoAFormItem: FC<GoAFormItemProps> = ({ children, helpText, error, optional, name, label }) => {
  return (
    <goa-form-item name={name} label={label} error={error} optional={optional} helptext={helpText}>
      {children}
    </goa-form-item>
  )
};

export default GoAFormItem;
