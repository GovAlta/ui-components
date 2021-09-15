import React, { ChangeEvent, FC } from 'react';
import classnames from 'classnames';
import './radio.scss';
import { ErrorProps } from '../_common/errorState';
import { TestProps } from '../../experimental/common';

interface Props {
  value: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export const GoARadio: FC<Props & ErrorProps & TestProps> = ({ state = 'valid', ...props }) => {
  function getCss(): string {
    return classnames({
      'goa-radio': true,
      'goa-radio--disabled': props.disabled,
      'goa-error': state === 'error',
    });
  }

  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value);
  }

  return (
    <label className={getCss()}>
      <input
        type="radio"
        name={props.name}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={onRadioChange}
      />
      <div className='goa-radio-icon'></div>
      <span className="goa-radio-label">{props.children}</span>
    </label>
  );
};

export default GoARadio;
