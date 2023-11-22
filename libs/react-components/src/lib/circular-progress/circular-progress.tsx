export type GoACircularProgressVariant = "fullscreen" | "inline";
export type GoACircularProgressSize = "small" | "large";

// legacy naming
export type CircularProgressVariant = GoACircularProgressVariant;
export type CircularProgressSize = GoACircularProgressSize;

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

export interface GoACircularProgressProps {
  variant?: CircularProgressVariant;
  size?: CircularProgressSize;
  message?: string;
  visible?: boolean;
  progress?: number;
  testId?: string;
}

export const GoACircularProgress = ({
  visible,
  message,
  progress,
  variant,
  size,
  testId,
}: GoACircularProgressProps) => {
  return (
    <goa-circular-progress
      visible={visible ? "true" : "false"}
      message={message}
      progress={progress}
      variant={variant}
      size={size}
      data-testid={testId}
    />
  );
};

export default GoACircularProgress;
