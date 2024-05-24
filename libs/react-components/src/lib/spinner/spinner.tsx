import { ABGovSpinnerSize, ABGovSpinnerType } from "@abgov/ui-components-common";

interface WCProps {
  size: ABGovSpinnerSize;
  type: ABGovSpinnerType;
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

export interface ABGovSpinnerProps {
  type: ABGovSpinnerType;
  size: ABGovSpinnerSize;
  invert?: boolean;
  progress?: number;
  testId?: string;
}

export type SpinnerProps = ABGovSpinnerProps;

export function ABGovSpinner({
  type,
  size,
  progress,
  invert,
  testId,
}: ABGovSpinnerProps): JSX.Element {
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

export default ABGovSpinner;
