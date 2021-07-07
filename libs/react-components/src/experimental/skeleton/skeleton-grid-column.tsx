import React from 'react';
import { GoASkeletonElement } from './skeleton-element';
import { GoAShimmer } from './skeleton-shimmer';
import './skeleton-element.scss';

export interface DisplayProps {
  /**
   * The number of rows to display.
   */
  rows?: number;
}

export const GoASkeletonGridColumnContent = ({ rows = 1 }: DisplayProps) => {
  const elements = [];

  for(let i = 0; i < rows; i++){
    elements.push(<GoASkeletonElement type="text" />);
  }

  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-content">
        <div>
          {elements}
        </div>
      </div>
      <GoAShimmer />
    </div>
  );
};
