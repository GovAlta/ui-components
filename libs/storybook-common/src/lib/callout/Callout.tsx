import React from 'react';
import './Callout.scss';

/**
 * Callout used by Do/Don't component.
 * @property {bool} positive Indicates if the callout should be styled positively or negatively.
 * @property {component} content Content to render
 */
export const Callout = ({positive, content}) => {
  return (
    <div className="callout" data-positive={positive}>
      <h3>{positive ? 'Do' : "Don't"}</h3>
      <p>
        {content}
      </p>
    </div>
  );
}


