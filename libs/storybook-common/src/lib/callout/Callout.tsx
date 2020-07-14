import React from 'react';
import './Callout.scss';

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


