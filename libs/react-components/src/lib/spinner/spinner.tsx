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
  type: GoabSpinnerType;
  /**
   * Sets the size of the spinner.
   * @required
   */
  size: GoabSpinnerSize;
  /**
   * When true, inverts colors for use on dark backgrounds.
   * @default false
   */
  invert?: boolean;
  /**
   * Progress value (0-100). When >= 0, shows a progress spinner instead of infinite.
   * @default -1
   */
  progress?: number;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
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
