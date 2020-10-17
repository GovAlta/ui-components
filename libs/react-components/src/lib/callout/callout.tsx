import React from 'react';
import PropTypes from 'prop-types';
import '../../theme.scss';
import '../../../../core-css/src/lib/styles/callout/callout.scss'

export const Callout = ({ title, type, content, children = null, ...props }) => {
  return (
    <div>
      <div className={`goa-callout goa--${type}`}>
        <div>        
            <h3>{title}</h3>
            <div className="messages">
              {content || children}
            </div>
        </div>
      </div>
    </div>
  );
};

Callout.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default Callout;
