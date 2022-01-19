import React from 'react';

type SpinnerType = "infinite" | "progress";
type SpinnerSize = "small" | "medium" | "large" | "xlarge";

interface WCProps {
  size: SpinnerSize;
  type: SpinnerType;
  invert: boolean;
  progress: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-spinner': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

export interface SpinnerProps {
  type: SpinnerType;
  size?: SpinnerSize;
  invert: boolean;
  progress: number;
}

export const GoASpinner = ({ type, size, progress, invert }: SpinnerProps) => {
  return <goa-spinner type={type} size={size} progress={progress} invert={invert} />;
};

export default GoASpinner;
