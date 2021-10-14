import React, { FC } from 'react';
import { GoAIcon, GoAIconType } from '../icons';
import { OnChange } from '../../lib/_common/input';
import './input.scss';

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';

interface Props {
  name: string;
  value: string;
  type: InputType;

  id?: string;
  disabled?: boolean;
  placeholder?: string;
  leadingIcon?: GoAIconType;
  onChange: OnChange;
};

export const GoAInput: FC<Props> = ({ onChange, leadingIcon, ...props  }) => {
  return (
    <div className="goa-input">
      {leadingIcon &&
        <div className="goa-input-leading-icon">
          <GoAIcon type={leadingIcon} />
        </div>
      }
      <input
        className={leadingIcon ? 'input--leading-icon' : ''}
        {...props}
        onChange={(e) => onChange(props.name, e.target.value)}
      />
    </div>
  );
};
export default GoAInput;
