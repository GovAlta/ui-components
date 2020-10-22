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
}

const GoACheckbox = ({ content, children = null, checked = false, required = false, disabled = false, indeterminate = false, labelPosition, ...props }:AppProps) => {
  const [checkedBox, setCheckedBox] = useState(checked);  
  const hasError = () => required && !checked;
  //const uniqueId = `goa-checkbox-${GoACheckboxComponent.idNum++}`
  
  return (
    <div className={`goa-checkbox ${disabled && 'goa-checkbox-disabled'} ${hasError() && 'has-error'} ${labelPosition === 'before' && 'goa-checkbox-label-before'}`}>
      <label className="goa-checkbox-layout">
          <div className="goa-checkbox-container">
              <input type="checkbox"
                checked={checkedBox}
                disabled={disabled}
                required={required}
                value={content}
                onChange={() => setCheckedBox(!checkedBox)}
              />
              { checkedBox && (
                <svg id='checkmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12.18" className="goa-checkmark">
                    <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z"/>
                </svg>
              )}
              { indeterminate && (
                <svg id='dashmark' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 2" className="goa-indeterminate">
                    <rect width="15" height="2"/>
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
