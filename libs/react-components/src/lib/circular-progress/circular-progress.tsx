import React from "react";

export type CircularProgressVariant = "fullscreen" | "inline";
export type CircularProgressSize = "small" | "large";

interface WCProps {
  variant?: CircularProgressVariant;
  size?: CircularProgressSize;
  message?: string;
  visible?: string;
  progress?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-circular-progress": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface CircularProgressProps {
  variant?: CircularProgressVariant;
  size?: CircularProgressSize;
  message?: string;
  visible?: boolean;
  progress?: number;
}

export const GoACircularProgress = ({
  visible,
  message,
  progress,
  variant,
  size,
}: CircularProgressProps) => {
  return (
    <goa-circular-progress
      visible={visible ? "true" : "false"}
      message={message}
      progress={progress}
      variant={variant}
      size={size}
    />
  );
};

export default GoACircularProgress;
