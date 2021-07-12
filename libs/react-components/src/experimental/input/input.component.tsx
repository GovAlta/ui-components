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
  onChange?: React.MouseEventHandler<HTMLButtonElement>;
}

export const GoAInput: FC<Props> = ({ validate = null, name = '', type = '', errorMsg = '', required = false, helpText = '', multiLine = false }) => {
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    const value = e.target.value;
    setValue(value);
    setValid(validate(value))
  }

  return (
    <div >
      {multiLine ?
        <textarea value={value} />
        : <input type={type} required={required} name={name}
          value={value}
          onChange={handleInput} className='goa-input-field' placeholder={name} />}
      { !valid ? <p className="goa-input-error-message" style={{ display: `${valid ? 'none' : 'block'}` }} >
        {errorMsg}</p> : ''}

      <p className="goa-input-help-text-message" style={{ display: `${helpText ? 'block' : 'none'}` }} >
        {helpText}</p>
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