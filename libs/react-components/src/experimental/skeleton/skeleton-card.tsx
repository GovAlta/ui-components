import React from 'react';
import { GoASkeletonElement } from './skeleton-element';
import { GoAShimmer } from './skeleton-shimmer';
import './skeleton-element.scss';

export const GoASkeletonCard = () => {
  return (
    <div className="skeleton skeleton-card-container">
      <div className="skeleton-wrapper">
        <div className="skeleton-card">
          <div>

          </div>
          <div className="card-separator"/>
          <div>
            <GoASkeletonElement type="title" />
            <GoASkeletonElement type="paragraph" />
          </div>
        </div>
      </div>
      <GoAShimmer/>
    </div>
  );
};
