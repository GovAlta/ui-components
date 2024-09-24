export type GoACircularProgressVariant = "fullscreen" | "inline";
export type GoACircularProgressSize = "small" | "large";

// legacy naming
export type CircularProgressVariant = GoACircularProgressVariant;
export type CircularProgressSize = GoACircularProgressSize;

interface WCProps {
  variant?: GoACircularProgressVariant;
  size?: GoACircularProgressSize;
  message?: string;
  visible?: string;
  progress?: number;
  testid?: string;
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
  variant?: GoACircularProgressVariant;
  size?: GoACircularProgressSize;
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
      testid={testId}
    />
  );
}

export default GoACircularProgress;
