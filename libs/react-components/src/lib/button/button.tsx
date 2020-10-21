import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

type AppProps = {
  content: string;
  buttonType?: string;
  buttonSize?: string;
  tooltip?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const GoAButton = ({ content, buttonType = "primary", buttonSize = 'normal', tooltip = null, children = null,  ...props }:AppProps) => {
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
