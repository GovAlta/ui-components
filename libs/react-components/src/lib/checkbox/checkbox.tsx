import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

type LabelPosition = "before" | "after";

type AppProps = {
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  labelPosition?: LabelPosition;
  content?: string;
  children?: React.ReactNode;
  selectionChange?: any;
}

const GoACheckbox = ({ content, children = null, checked = false, required = false, disabled = false, indeterminate = false, labelPosition, selectionChange, ...props }:AppProps) => {
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
  children: PropTypes.node,
};

export default GoACheckbox;
