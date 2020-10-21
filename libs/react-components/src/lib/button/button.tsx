import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export const GoAButtonComponent = ({ content, buttonType = "primary", buttonSize = 'normal', tooltip = null, children = null,  ...props }) => {
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

GoAButtonComponent.propTypes = {
  buttonSize: PropTypes.string,
  buttonType: PropTypes.string,
  content: PropTypes.string,
};

export default GoAButtonComponent;
