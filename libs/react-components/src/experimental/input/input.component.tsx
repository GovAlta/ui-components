import React, { FC } from 'react';
import { GoAIcon, GoAIconType } from '../icons';
import { OnChange } from '../../lib/_common/input';
import './input.scss';

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

type Props = {
  name: string;
  value: string;
  type: InputType;
  disabled?: boolean;
  placeholder?: string;
  leadingIcon?: GoAIconType;
  onChange: OnChange
};

export const GoAInput: FC<Props> = ({ name, value, type, disabled, placeholder, leadingIcon, onChange }) => {
  return (
    <div className="goa-input">
      {leadingIcon &&
        <div className="goa-input-leading-icon">
          <GoAIcon type={leadingIcon} />
        </div>
      }
      <input
        className={leadingIcon ? 'input--leading-icon' : ''}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};
export default GoAInput;
