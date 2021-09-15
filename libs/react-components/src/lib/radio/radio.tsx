import React, { ChangeEvent, FC } from 'react';
import classnames from 'classnames';
import './radio.scss';
import { ErrorProps } from '../_common/errorState';
import { TestProps } from '../../experimental/common';

interface Props {

  /**
   * The name of the value of the current
  */
  value: string;

  /**
   * The name of the html input tag. Has to match other radio buttons to form a group
  */
  name?: string;

  /**
   * Determines whether the radio button is currently disabled
  */
  disabled?: boolean;

  /**
   * Determines whether the radio button is currently selected
  */
  checked: boolean;

  /**
   * Determines if the radio button is in a valid or error state
  */
  state?: 'valid' | 'error';

  /**
   * Callback function containing the newly selected value
  */
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
