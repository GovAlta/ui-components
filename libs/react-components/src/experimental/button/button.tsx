import React, { FC, LegacyRef, MutableRefObject, useRef } from 'react';
import styles from './button.module.scss';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'borderless';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonVariant = 'default' | 'danger'

type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  title?: string;
  variant?: ButtonVariant;
  onClick: () => void;
  [key: string]: unknown;
};

export const GoAButton: FC<ButtonProps> = ({ type = 'primary', size = 'medium', variant = 'default', title, children, onClick, ...props }) => {
  const css = [
    styles[`goa-button--${type}`],
    styles[`goa-button--${size}`],
    styles[`goa-button--${variant}`],
    styles['goa-button'],
  ].join(' ');
  const buttonRef = useRef();

  const _onClick = () => {
    onClick();
    setTimeout(() => {
      buttonRef?.current.blur();
    }, 200)
  }

  return (
    <button className={css} ref={buttonRef} title={title} onClick={_onClick} {...props}>
      {children}
    </button>
  );
}
  ;
export default GoAButton;
