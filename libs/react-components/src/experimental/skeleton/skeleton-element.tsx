import React from 'react';
import './skeleton-element.scss';

type indicatorType = 'text' | 'avatar' | 'title' | 'paragraph' | 'thumbnail' | 'card';

export interface SkeletonProps {
  type?: indicatorType;
}

export const GoASkeletonElement = ({ type = 'text' }: SkeletonProps) => {
  const classes = `skeleton ${type}`;

  return <div className={classes}></div>;
};
