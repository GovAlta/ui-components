import React, { FC } from 'react';
import { GoAIcon, GoAIconType } from '../icons';
import { OnChange } from '../../lib/_common/input';
import './input.scss';

interface Props {
  name: string;
  value: string;

  id?: string;
  disabled?: boolean;
  placeholder?: string;
  leadingIcon?: GoAIconType;
  onChange: OnChange;
};

export const GoAInput: FC<Props & { type: string }> = ({ onChange, leadingIcon, ...props }) => {
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

export const GoAInputText: FC<Props> = (props) => {
  return <GoAInput {...props} type="text" />;
}

export const GoAInputPassword: FC<Props> = (props) => {
  return <GoAInput {...props} type="password" />;
}

export const GoAInputDate: FC<Props & { min: string, max: string }> = (props) => {
  return <GoAInput {...props} type="date" />;
}

export const GoAInputTime: FC<Props> = (props) => {
  return <GoAInput {...props} type="time" />;
}

export const GoAInputDateTime: FC<Props & { min: string, max: string }> = (props) => {
  return <GoAInput {...props} type="datetime-local" />;
}

export const GoAInputEmail: FC<Props> = (props) => {
  return <GoAInput {...props} type="email" />;
}

export const GoAInputSearch: FC<Props> = (props) => {
  return <GoAInput {...props} type="search" />;
}

export const GoAInputUrl: FC<Props> = (props) => {
  return <GoAInput {...props} type="url" />;
}

export const GoAInputTel: FC<Props> = (props) => {
  return <GoAInput {...props} type="tel" />;
}

export const GoAInputFile: FC<Props> = (props) => {
  return <GoAInput {...props} type="file" />;
}

export const GoAInputMonth: FC<Props> = (props) => {
  return <GoAInput {...props} type="month" />;
}

export const GoAInputNumber: FC<Props & { min: number, max: number, step: number }> = (props) => {
  return <GoAInput {...props} type="number" />;
}

export const GoAInputRange: FC<Props & { min: number, max: number, step: number }> = (props) => {
  return <GoAInput {...props} type="range" />;
}

export default GoAInput;
