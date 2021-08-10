import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import './input.scss';
type Props = {
  validate?: (value: string) => boolean;
  name?: string;
  type: string;
  message?: string;
  required?: boolean;
  helpText?: string;
  multiLine?: boolean;
  navigator?: boolean;
  onChange?: (value: string) => void;
};

export const GoAInput: FC<Props> = ({
  validate = null,
  name = '',
  type = '',
  message = '',
  required = false,
  helpText = '',
  multiLine = false,
  navigator = false,
  onChange,
}) => {
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    const value = e.target.value;
    setValue(value);
    if (validate) {
      setValid(validate(value));
    }
    onChange(value);
  };

  const inputFieldClass = !message
    ? 'goa-input-field'
    : !navigator
      ? 'goa-input-field-error'
      : 'goa-input-highlight-error';
  return (
    <div>
      {multiLine ? (
        <textarea
          placeholder={name}
          onChange={handleInput}
          className={inputFieldClass}
        >
          {value}
        </textarea>
      ) : (
          <input
            type={type}
            required={required}
            name={name}
            value={value}
            onChange={handleInput}
            className={inputFieldClass}
            placeholder={name}
          />
        )}
      {message && <p className="goa-input-error-message">{message}</p>}

      {helpText && <p className="goa-input-help-text-message">{helpText}</p>}
    </div>
  );
};
GoAInput.propTypes = {
  validate: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string,
  multiLine: PropTypes.bool,
  navigator: PropTypes.bool,
  onChange: PropTypes.func,
};
export default GoAInput;
