import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'borderless' | 'red';
type ButtonSize = 'small' | 'normal';

type ButtonProps = {
  /**
   * Type of button
   */
  buttonType?: ButtonType;
  /**
   * Size of button
   */
  buttonSize?: ButtonSize;
  /**
   * Mouseover popup description
   */
  title?: string;
  /**
   * Action to take on button click
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Button content (between button tags)
   */
  children?: React.ReactNode;
  [key: string]: any;
};

export const GoAButton = ({
  buttonType = 'primary',
  buttonSize = 'normal',
  title = null,
  children = null,
  onClick = null,
  ...props
}: ButtonProps) => {
  const btnTypeClass = buttonType === 'primary' ? '' : `goa--${buttonType}`;
  const btnSize = buttonSize === 'small' ? 'btn-small' : '';
  return (
    <button
      className={`goa-button ${btnSize} ${btnTypeClass}`}
      title={title}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

GoAButton.propTypes = {
  buttonSize: PropTypes.string,
  buttonType: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default GoAButton;
