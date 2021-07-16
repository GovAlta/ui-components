import React from 'react';
import PropTypes from 'prop-types';
import '../../theme.scss';
import '../../../../core-css/src/lib/styles/callout/callout.scss'

type calloutType = "important" | 'information' | 'event' | 'success' | 'emergency';

export interface CalloutProps {
  /**
   * Callout title.
  */
  title?: string,
  /**
   * The type of the callout, changes stylings and icons.
  */
  type?: calloutType,
  /**
   * Callout description
  */
  content?: string,
  children?: React.ReactNode,
}

export const GoACallout = ({ title, type = "information", content, children = null, ...props }: CalloutProps) => {
  return (
    <div>
      <div className={`goa-callout goa--${type}`}>
        <div>
          <h3 data-testid='callout-title'>{title}</h3>
          <div className="messages" data-testid='callout-content'>
            {content || children}
          </div>
        </div>
      </div>
    </div>
  );
};

GoACallout.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default GoACallout;
