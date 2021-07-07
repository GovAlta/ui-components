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

export const GoASkeletonImageContent = ({ rows = 1 }: DisplayProps) => {
  const elements = [];

  for(let i = 0; i < rows; i++){
    elements.push(<GoASkeletonElement type="text" />);
  }

  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-image-content">
        <div>
          <GoASkeletonElement type="thumbnail" />
        </div>
        <div className="left-content">
          <GoASkeletonElement type="title" />
          
          {elements}
        </div>
      </div>
      <GoAShimmer/>
    </div>
  )
}
