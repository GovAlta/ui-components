import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "normal";

type AppProps = {
  /**
   * Information to the user goes in the content. Information can include markup
  */
  content?: string;
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
  tooltip?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const GoAButton = ({ content, buttonType = "primary", buttonSize = 'normal', tooltip = null, children = null,  ...props }:AppProps) => {
  let buttonTypeClass = buttonType==='primary' ? '' : `goa--${buttonType}`;
  return (
    <div>
      <button
        className={`goa-button ${buttonSize==='small' ? 'btn-small' : ''} ${buttonTypeClass}`}
        title={tooltip}
        {...props}
      >
        {content || children}
      </button>
    </div>
  );
};

GoAButton.propTypes = {
  buttonSize: PropTypes.string,
  buttonType: PropTypes.string,
  content: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node,
};

export default GoAButton;
