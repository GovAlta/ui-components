import React, { FC } from 'react';

interface GoAFormItemProps {
  helpText?: string;
  error?: string;
};

export const GoAFormItem: FC<GoAFormItemProps> = ({ children, helpText, error }) => {
  const className = error ? "goa-form-item goa-state--error" : "goa-form-item";
  return (
    <div className={className}>
      {children}
      {error && <div className="error-msg">{error}</div>}
      {helpText && <div id="helpText" className="help-msg">{helpText}</div>}
    </div>
  );
};

export default GoAFormItem;
