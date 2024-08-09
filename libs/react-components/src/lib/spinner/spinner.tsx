import { GoABSpinnerSize, GoABSpinnerType } from "@abgov/ui-components-common";

interface WCProps {
  size: GoABSpinnerSize;
  type: GoABSpinnerType;
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

export interface GoABSpinnerProps {
  type: GoABSpinnerType;
  size: GoABSpinnerSize;
  invert?: boolean;
  progress?: number;
  testId?: string;
}

export type SpinnerProps = GoABSpinnerProps;

export function GoABSpinner({
  type,
  size,
  progress,
  invert,
  testId,
}: GoABSpinnerProps): JSX.Element {
  return (
    <goa-spinner
      type={type}
      size={size}
      progress={progress}
      invert={invert}
      data-testid={testId}
    />
  );
}

export default GoABSpinner;
