export type SpinnerType = "infinite" | "progress";
export type SpinnerSize = "small" | "medium" | "large" | "xlarge";

interface WCProps {
  size: SpinnerSize;
  type: SpinnerType;
  invert?: boolean;
  progress?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-spinner": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface SpinnerProps {
  type: SpinnerType;
  size: SpinnerSize;
  invert?: boolean;
  progress?: number;
  testId?: string;
}

export function GoASpinner({
  type,
  size,
  progress,
  invert,
  testId,
}: SpinnerProps): JSX.Element {
  return (
    <goa-spinner
      type={type}
      size={size}
      progress={progress}
      invert={invert}
      data-testid={testId}
    />
  );
};

export default GoASpinner;
