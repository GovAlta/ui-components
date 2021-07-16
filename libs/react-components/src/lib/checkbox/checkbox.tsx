import React from 'react';
import './checkbox.scss';
import classNames from 'classnames';

type LabelPosition = "before" | "after";


/* eslint-disable-next-line */
export interface CheckboxProps {
  /**
   * Boolean indicating whether or not the checkbox is checked/selected.
  */
  checked?: boolean,
  /**
   * Boolean indicating whether or not the checkbox is required.
  */
  required?: boolean,
  /**
   * Boolean indicating whether or not the checkbox is disabled.
  */
  disabled?: boolean,
  /**
   * Boolean indicating whether or not the checkbox should display as indeterminate (i.e. it has associated 'child' checkboxes, some of which are selected)
  */
  indeterminate?: boolean,
  /**
   * The position to display the label/text for the checkbox. Valid values are before and after.
  */
  labelPosition?: LabelPosition,
  /**
   * The content of the checkbox label.
  */
  content?: string,
  /**
   * The value of the checkbox.
  */
  value?: string,
  children?: React.ReactNode,
  /**
   * Callback which returns whether button is checked.
  */
  selectionChange?: (value: boolean) => void,
}

export const GoACheckbox = ({ checked = false, required = false, disabled = false, indeterminate = false, labelPosition = 'before', value = '',  content, children, selectionChange }: CheckboxProps) => {
  const hasError = () => required && !checked;

  const rootCss = (): string => {
    return classNames({
      'goa-checkbox': true,
      'goa-checkbox-disabled': disabled,
      'has-error': hasError(),
      'goa-checkbox-label-before': labelPosition === 'before'
    })
  };

  const checkboxCss = (): string => {
    return classNames({
      'goa-checkbox-container': true,
      'goa-checkbox-selected': !indeterminate && checked,
      'goa-checkbox-indeterminate': indeterminate && checked,
    })
  };

  return (
    <div className={rootCss()}>
      <label className="goa-checkbox-layout">
        <div className={checkboxCss()}>
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            required={required}
            value={value}
            onChange={(e) => selectionChange(e.target.checked)}
          />
          {indeterminate && checked && (
            <svg id='dashmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 2" className="goa-indeterminate">
              <rect width="15" height="2" />
            </svg>
          )}
          {!indeterminate && checked && (
            <svg id='checkmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.18" className="goa-checkmark">
              <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z" />
            </svg>
          )}
        </div>
        <span className="goa-checkbox-label">
          {content || children}
        </span>
      </label>
    </div>
  );
};

export default GoACheckbox;
