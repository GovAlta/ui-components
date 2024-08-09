import {
  GoABCircularProgressSize,
  GoABCircularProgressVariant,
} from "@abgov/ui-components-common";

interface WCProps {
  variant?: GoABCircularProgressVariant;
  size?: GoABCircularProgressSize;
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

export interface GoABCircularProgressProps {
  variant?: GoABCircularProgressVariant;
  size?: GoABCircularProgressSize;
  message?: string;
  visible?: boolean;
  progress?: number;
  testId?: string;
}

export const GoABCircularProgress = ({
  visible,
  message,
  progress,
  variant,
  size,
  testId,
}: GoABCircularProgressProps) => {
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

export default GoABCircularProgress;
