import {
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
} from "../../common/types";

interface WCProps {
  variant?: GoabCircularProgressVariant;
  size?: GoabCircularProgressSize;
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

export interface GoabCircularProgressProps {
  variant?: GoabCircularProgressVariant;
  size?: GoabCircularProgressSize;
  message?: string;
  visible?: boolean;
  progress?: number;
  testId?: string;
}

export const GoabCircularProgress = ({
  visible,
  message,
  progress,
  variant,
  size,
  testId,
}: GoabCircularProgressProps) => {
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
};

export default GoabCircularProgress;
