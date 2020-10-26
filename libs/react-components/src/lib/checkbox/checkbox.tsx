import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

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
   * The position to display the label/text for the checbox. Valid values are before and after.
  */
  labelPosition?: LabelPosition,
  /**
   * The content of the checkbox label.
  */
  content?: string,
  children?: React.ReactNode,
  /**
   * Callback which returns whether button is checked.
  */
  selectionChange?: any,
}

export const GoACheckbox = ({checked = false, required = false, disabled = false, indeterminate = false, labelPosition = "before", content, children,selectionChange }: CheckboxProps) => {
  const [checkedBox, setCheckedBox] = useState(checked);
  const [checkedBoxOld, setCheckedBoxOld] = useState(checked);
  const [indeterminateCheck, setIndeterminateCheck] = useState(indeterminate);
  const [indeterminateCheckOld, setIndeterminateCheckOld] = useState(indeterminate);
  const [lastChecked, setLastChecked] = useState(indeterminate ? 'indeterminate' : 'checked');

  const hasError = () => required && !checked;
  const indeterminateControlTrigger = () => indeterminate !== indeterminateCheckOld;
  const checkboxControlTrigger = () => checked !== checkedBoxOld;

  const checkboxHandler = () => {
    setIndeterminateCheck(false);
    setCheckedBox(!checkedBox)
    selectionChange(!checkedBox);
    setLastChecked(checked === false ? 'checked' : 'indeterminate')
  }

  if (checkboxControlTrigger()) {
    setCheckedBox(checked);
    setCheckedBoxOld(checked);
    selectionChange(checked);
    setLastChecked(checked === true ? 'checked' : 'indeterminate')
  }

  if (indeterminateControlTrigger()) {
    setIndeterminateCheck(indeterminate);
    setIndeterminateCheckOld(indeterminate);
    setLastChecked(indeterminate === true ? 'indeterminate' : 'checked')
  }
  
  return (
    <div className={`goa-checkbox ${disabled && 'goa-checkbox-disabled'} ${hasError() && 'has-error'} ${labelPosition === 'before' && 'goa-checkbox-label-before'}`}>
      <label className="goa-checkbox-layout">
          <div className={`goa-checkbox-container ${checkedBox && lastChecked === 'checked' && 'goa-checkbox-selected'} ${indeterminateCheck && lastChecked === 'indeterminate' && 'goa-checkbox-indeterminate'}` }>
              <input 
                type="checkbox"
                checked={checkedBox}
                disabled={disabled}
                required={required}
                value={content}
                onChange={() => checkboxHandler()}
              />
              { indeterminateCheck && lastChecked === 'indeterminate' && (
                <svg id='dashmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 2" className="goa-indeterminate">
                    <rect width="15" height="2"/>
                </svg>
              )}
              { checkedBox && lastChecked === 'checked' && (
                <svg id='checkmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.18" className="goa-checkmark">
                    <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z"/>
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

GoACheckbox.propTypes = {
  content: PropTypes.string,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  indeterminate: PropTypes.bool,
  labelPosition: PropTypes.string,
  children: PropTypes.node,
};

export default GoACheckbox;
