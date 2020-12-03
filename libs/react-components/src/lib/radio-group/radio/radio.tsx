import React, { ChangeEvent, FC, useContext } from 'react';
import classnames from 'classnames';
import { RadioContext, RadioUpdateContext } from '../radio-group';
import './radio.scss';

export type LabelPosition = 'before' | 'after';

export interface Data {
  text: string;
  value: string;
}

export interface Props {
  value: string;
  name?: string;
  labelPosition?: LabelPosition;
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
}

export const GoARadio: FC<Props> = ({
  name,
  value,
  disabled,
  labelPosition = 'after',
  required,
  children,
}) => {
  const selectedValue = useContext(RadioContext);
  const updateSelectedValue = useContext(RadioUpdateContext);

  function hasError(): boolean {
    return required && !selectedValue;
  }

  function getSelectedCss(): string {
    return classnames({
      'goa-radio-container': true,
      'goa-radio-selected': isChecked(),
    });
  }

  function getRootCssClasses(): string {
    return classnames({
      'goa-radio': true,
      'goa-radio-disabled': disabled,
      'has-error': hasError(),
      'goa-radio-label-before': labelPosition === 'before',
    });
  }

  function isChecked(): boolean {
    return selectedValue === value;
  }

  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    updateSelectedValue(e.target.value);
  }

  return (
    <div className={getRootCssClasses()}>
      <label className="goa-radio-layout">
        <div className={getSelectedCss()}>
          <input
            type="radio"
            name={name}
            value={value}
            checked={isChecked()}
            disabled={disabled}
            onChange={onRadioChange}
          />
          {isChecked() && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <circle cx="6" cy="6" r="6" fill="#fff" />
            </svg>
          )}
        </div>
        <span className="goa-radio-label">{children}</span>
      </label>
    </div>
  );
};

export default GoARadio;
