import React, { FC, useEffect } from 'react';
import { GoAIcon, GoAIconButton, GoAIconType } from '../icons';
import { OnChange } from '../../lib/_common/input';
import './input.scss';
import classNames from 'classnames';

interface Props {
  // required
  name: string;
  value: string;
  onChange: OnChange;

  // optional
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  leadingIcon?: GoAIconType;
  trailingIcon?: GoAIconType;
  onTrailingIconClick?: () => void;
  variant?: 'goa' | 'bare';
  focused?: boolean;
  readonly?: boolean;
};

export const GoAInput: FC<Props & { type: string }> = ({
  name,
  onTrailingIconClick,
  onChange,
  leadingIcon,
  trailingIcon,
  variant = 'goa',
  focused,
  ...other
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [focused, inputRef]);

  return (
    <div className="goa-input">
      {leadingIcon &&
        <div className="goa-input-leading-icon">
          <GoAIcon type={leadingIcon} />
        </div>
      }
      <input
        ref={inputRef}
        className={classNames({
          [`input--${variant}`]: true,
          'input--leading-icon': leadingIcon,
        })}
        onChange={(e) => onChange(name, e.target.value)}
        {...other}
      />

      {trailingIcon && !onTrailingIconClick &&
        <div className="goa-input-trailing-icon">
          <GoAIcon size="medium" type={trailingIcon} />
        </div>
      }

      {trailingIcon && onTrailingIconClick &&
        <div onClick={onTrailingIconClick} className="goa-input-trailing-icon">
          <GoAIconButton variant="tertiary" onClick={onTrailingIconClick} size="medium" type={trailingIcon} testId={`${name}-input-trailing-button`} />
        </div>
      }
    </div>
  );
};

export const GoAInputText: FC<Props> = (props) => {
  return <GoAInput {...props} type="text" />;
}

export const GoAInputPassword: FC<Props> = (props) => {
  return <GoAInput {...props} type="password" />;
}

export const GoAInputDate: FC<Props & { min?: string, max?: string }> = (props) => {
  return <GoAInput {...props} type="date" trailingIcon="calendar" />;
}

export const GoAInputTime: FC<Props> = (props) => {
  return <GoAInput {...props} type="time" />;
}

export const GoAInputDateTime: FC<Props & { min?: string, max?: string }> = (props) => {
  return <GoAInput {...props} type="datetime-local" trailingIcon="calendar" />;
}

export const GoAInputEmail: FC<Props> = (props) => {
  return <GoAInput {...props} type="email" />;
}

export const GoAInputSearch: FC<Props> = (props) => {
  return <GoAInput {...props} type="text" trailingIcon="search" />;
}

export const GoAInputUrl: FC<Props> = (props) => {
  return <GoAInput {...props} type="url" />;
}

export const GoAInputTel: FC<Props> = (props) => {
  return <GoAInput {...props} type="tel" />;
}

export const GoAInputFile: FC<Props> = (props) => {
  return <input id={props.id} name={props.name} type="file" onChange={(e) => props.onChange(e.target.name, e.target.value)} style={{ backgroundColor: 'revert' }} />;
}

export const GoAInputMonth: FC<Props> = (props) => {
  return <GoAInput {...props} type="month" trailingIcon="calendar" />;
}

export const GoAInputNumber: FC<Props & { min?: number, max?: number, step?: number }> = (props) => {
  return <GoAInput {...props} type="number" />;
}

export const GoAInputRange: FC<Props & { min?: number, max?: number, step?: number }> = ({ step = 1, ...props }) => {
  return <input {...props} type="range" onChange={(e) => props.onChange(e.target.name, e.target.value)} />;
}

export default GoAInput;
