import React, { FC } from 'react';
import { OnChange } from '../common';
import './textarea.scss';

interface Props {
  // TODO: determine if the name/value should be moved into an interface to better ensure consistency
  name: string;
  value: string;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
  onChange: OnChange;
};

export const GoATextArea: FC<Props> = ({ id, name, value, placeholder, ariaLabel, onChange }) => {
  return (
    <textarea
      id={id}
      name={name}
      className="goa-textarea"
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(e) => onChange(name, e.target.value)}
      value={value}
    >
    </textarea>
  );
};

export default GoATextArea;
