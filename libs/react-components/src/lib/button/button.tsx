import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

type ButtonType = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'normal';

type AppProps = {
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
  children?: React.ReactNode;
  [key: string]: any;
};

export const GoAButton = ({
  buttonType = 'primary',
  buttonSize = 'normal',
  title = null,
  children = null,
  ...props
}: AppProps) => {
  let btnTypeClass = buttonType === 'primary' ? '' : `goa--${buttonType}`;
  let btnSize = buttonSize === 'small' ? 'btn-small' : '';
  return (
    <button
      className={`goa-button ${btnSize} ${btnTypeClass}`}
      title={title}
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
};

export default GoAButton;
