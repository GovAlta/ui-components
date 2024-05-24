import { ABGovCircularProgressSize, ABGovCircularProgressVariant } from "@abgov/ui-components-common";

interface WCProps {
  variant?: ABGovCircularProgressVariant;
  size?: ABGovCircularProgressSize;
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

export interface ABGovCircularProgressProps {
  variant?: ABGovCircularProgressVariant;
  size?: ABGovCircularProgressSize;
  message?: string;
  visible?: boolean;
  progress?: number;
  testId?: string;
}

export const ABGovCircularProgress = ({
  visible,
  message,
  progress,
  variant,
  size,
  testId,
}: ABGovCircularProgressProps) => {
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
}

export default ABGovCircularProgress;
