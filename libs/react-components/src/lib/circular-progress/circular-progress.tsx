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
  /**
   * Stretch across the full screen or use it inline
   * @default "inline"
   */
  variant?: GoabCircularProgressVariant;
  /**
   * Size of the progress indicator
   * @default "large"
   */
  size?: GoabCircularProgressSize;
  /**
   * Loading message displayed under the progress indicator
   * @default ""
   */
  message?: string;
  /**
   * Show/hide the page loader. This allows for fade transition to be applied in each transition.
   * @default false
   */
  visible?: boolean;
  /**
   * Set the progress value. Setting this value will change the type from infinite to progress
   * @default -1
   */
  progress?: number;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
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
