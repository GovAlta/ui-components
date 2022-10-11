import React from 'react';

export type SkeletonType = "image" | "text" | "title" | "text-small" | "avatar" | "header" | "paragraph" | "thumbnail" | "card" | "profile";

interface WCProps {
  width?: string;
  size?: number;
  linecount?: number;
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
  width?: string;
  size?: number;
  lineCount?: number;
  type: SkeletonType;
}

export const GoASkeleton = ({ width, size, lineCount, type }: SkeletonProps) => {
  return <goa-skeleton width={width} linecount={lineCount} type={type} size={size} />;
};

export default GoASkeleton;
