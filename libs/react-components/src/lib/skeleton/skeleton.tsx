import React from 'react';

type SkeletonType = "image" | "text" | "title" | "text-small" | "avatar" | "header" | "paragraph" | "thumbnail" | "card" | "profile";

interface WCProps {
  size: number;
  type: SkeletonType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-skeleton': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

export interface SkeletonProps {
  type: SkeletonType;
  size?: number;
}

export const GoASkeleton = ({ type, size = 0  }: SkeletonProps) => {
  return <goa-skeleton type={type} size={size} />;
};

export default GoASkeleton;
