import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";

interface WCProps {
  size: GoabSpinnerSize;
  type: GoabSpinnerType;
  invert?: boolean;
  progress?: number;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-spinner": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabSpinnerProps {
  type: GoabSpinnerType;
  size: GoabSpinnerSize;
  invert?: boolean;
  progress?: number;
  testId?: string;
}

export type SpinnerProps = GoabSpinnerProps;

export function GoabSpinner({
  type,
  size,
  progress,
  invert,
  testId,
}: GoabSpinnerProps): JSX.Element {
  return (
    <goa-spinner
      type={type}
      size={size}
      progress={progress}
      invert={invert}
      testid={testId}
    />
  );
}

export default GoabSpinner;
