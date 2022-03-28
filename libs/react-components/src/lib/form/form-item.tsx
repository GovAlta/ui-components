import React, { FC } from 'react';

interface WCProps {
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
  label: string;
  optional?: boolean;
  error?: string;
  helpText?: string;
};

export const GoAFormItem: FC<GoAFormItemProps> = ({ children, helpText, error, optional, label }) => {
  return (
    <goa-form-item label={label} error={error} optional={optional} helptext={helpText}>
      {children}
    </goa-form-item>
  )
};

export default GoAFormItem;
