import React from 'react';
import { GoASkeletonElement } from './skeleton-element';
import './skeleton-element.scss';

export interface DisplayProps {
  /**
   * The number of rows to display.
   */
  rows?: number;
}

export const GoASkeletonImageContent = ({ rows = 1 }: DisplayProps) => {
  const elements = [];

  for (let i = 0; i < rows; i++) {
    elements.push(<GoASkeletonElement type="text" />);
  }

  return (
    <div className="skeleton-image-content">
      <GoASkeletonElement type="thumbnail" />
      <div className="skeleton-image-content__text">
        <GoASkeletonElement type="title" />

        {elements}
      </div>
    </div>
  )
}
