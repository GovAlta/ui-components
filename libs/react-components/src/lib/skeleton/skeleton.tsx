import React from "react";

export type SkeletonType =
  | "image"
  | "text"
  | "title"
  | "text-small"
  | "avatar"
  | "header"
  | "paragraph"
  | "thumbnail"
  | "card"
  | "profile";

type SkeletonSize = 1 | 2 | 3 | 4;

interface WCProps {
  maxwidth?: string;
  size?: SkeletonSize;
  linecount?: number;
  type: SkeletonType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-skeleton": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface SkeletonProps {
  maxWidth?: string;
  size?: SkeletonSize;
  lineCount?: number;
  type: SkeletonType;
}

export const GoASkeleton = ({
  maxWidth,
  size,
  lineCount,
  type,
}: SkeletonProps) => {
  return (
    <goa-skeleton
      maxwidth={maxWidth}
      linecount={lineCount}
      type={type}
      size={size}
    />
  );
};

export default GoASkeleton;
