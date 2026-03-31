import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";

import type { JSX } from "react";

interface WCProps {
  size: GoabSpinnerSize;
  type: GoabSpinnerType;
  invert?: string;
  progress?: number;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-spinner": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabSpinnerProps {
  /** @required Sets the spinner animation type. */
  type: GoabSpinnerType;
  /** @required Sets the size of the spinner. */
  size: GoabSpinnerSize;
  /** When true, inverts colors for use on dark backgrounds. */
  invert?: boolean;
  /** Progress value (0-100). When set to 0 or greater, shows a progress spinner instead of infinite. */
  progress?: number;
  /** Sets a data-testid attribute for automated testing. */
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
      invert={invert ? "true" : undefined}
      testid={testId}
    />
  );
}

export default GoabSpinner;
