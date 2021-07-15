import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import './input.scss';
type Props = {
  validate?: (value: string) => boolean;
  name?: string;
  type: string;
  errorMsg?: string;
  required?: boolean;
  helpText?: string;
  multiLine?: boolean;
  onChange?: (value: string) => void;
}

export const GoAInput: FC<Props> = ({ validate = null, name = '', type = '', errorMsg = '', required = false, helpText = '', multiLine = false, onChange }) => {
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    const value = e.target.value;
    setValue(value);
    if (validate) {
      setValid(validate(value))
    }
    onChange(value);
  }

  const inputFieldClass = !errorMsg ? 'goa-input-field' : 'goa-input-field-error';
  return (
    <div >
      {multiLine ?
        <textarea placeholder={name} onChange={handleInput}>{value}</textarea>
        : <input type={type} required={required} name={name}
          value={value}
          onChange={handleInput} className={inputFieldClass} placeholder={name} />}
      { errorMsg && <p className="goa-input-error-message"  >
        {errorMsg}</p>}

      { helpText && <p className="goa-input-help-text-message" >
        {helpText}</p>}
    </div>
  );
}
GoAInput.propTypes = {
  validate: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  errorMsg: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string,
  multiLine: PropTypes.bool,
  onChange: PropTypes.func
}
export default GoAInput;