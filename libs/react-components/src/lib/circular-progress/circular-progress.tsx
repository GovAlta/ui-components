import {
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
} from "@abgov/ui-components-common";

interface WCProps {
  variant?: GoabCircularProgressVariant;
  size?: GoabCircularProgressSize;
  message?: string;
  visible?: string;
  progress?: number;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-circular-progress": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCircularProgressProps {
  /** Controls the display mode. 'fullscreen' stretches across the full screen; 'inline' is used within content. @default "inline" */
  variant?: GoabCircularProgressVariant;
  /** Sets the size of the progress indicator. @default "large" */
  size?: GoabCircularProgressSize;
  /** Loading message displayed below the progress indicator. */
  message?: string;
  /** Controls visibility of the progress indicator, allowing a fade transition to be applied. */
  visible?: boolean;
  /** Sets the progress value (0–100). When omitted, an infinite spinner is shown. */
  progress?: number;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/** Provide feedback of progress to users while loading. */
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
      visible={visible ? "true" : undefined}
      message={message}
      progress={progress}
      variant={variant}
      size={size}
      testid={testId}
    />
  );
};

export default GoabCircularProgress;
