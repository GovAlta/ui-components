import React, { FC, useState } from 'react';
import '../form.scss';
interface Props {
  validate?: (value: string) => boolean;
  name?: string;
  type?: string;
  errorMsg?: string;
  required?: boolean;
  helpText?: string;
  multiLine?: boolean
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
          onChange={handleInput} />}
      { !valid ? <p className="goa-form-error-message" style={{ display: `${valid ? 'none' : 'block'}` }} >
        {errorMsg}</p> : ''}

      <p className="goa-form-help-text-message" style={{ display: `${helpText ? 'block' : 'none'}` }} >
        {helpText}</p>
    </div>
  );
}

export default GoAInput;