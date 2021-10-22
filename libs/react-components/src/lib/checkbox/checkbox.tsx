import React, { FC } from 'react';
import './checkbox.scss';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface CheckboxProps {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  content?: string;
  value?: string | number | boolean;
  onChange?: (name: string, value: string) => void;
}

export const GoACheckbox: FC<CheckboxProps> = ({ name, checked, disabled, indeterminate, value = true, content, children, onChange }) => {
  const rootCss = (): string => {
    return classNames({
      'goa-checkbox': true,
      'goa-checkbox--disabled': disabled,
    })
  };

  const checkboxCss = (): string => {
    return classNames({
      'goa-checkbox-container': true,
      'goa-checkbox--selected': checked,
    })
  };

  return (
    <label className={rootCss()}>
      <div className={checkboxCss()}>
        <input
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          value={`${value}`}
          onChange={(e) => onChange(name, e.target.checked ? `${value}` : null)}
        />
        {indeterminate && checked && (
          <svg id='dashmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 2">
            <rect width="15" height="2" />
          </svg>
        )}
        {!indeterminate && checked && (
          <svg id='checkmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.18">
            <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z" />
          </svg>
        )}
      </div>
      <div className="goa-checkbox-text">
        {content || children}
      </div>
    </label>
  );
};

export default GoACheckbox;
