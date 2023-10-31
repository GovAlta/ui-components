import React, { FC } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-microsite-header": WebComponentProps &
      React.HTMLAttributes<HTMLElement>;
    }
  }
}

export type ServiceLevel = "alpha" | "beta" | "live";

interface WebComponentProps {
  type: ServiceLevel;
  version?: string;
  feedbackurl?: string;
  maxcontentwidth?: string;
  feedbackurltarget?: "self" | "blank";
  headerurltarget?: "self" | "blank";
}

export interface HeaderProps {
  type: ServiceLevel;
  version?: string;
  feedbackUrl?: string;
  testId?: string;
  maxContentWidth?: string;
  feedbackUrlTarget?: "self" | "blank";
  headerUrlTarget?: "self" | "blank";
}

export const GoAMicrositeHeader: FC<HeaderProps> = ({
  type,
  version,
  feedbackUrl,
  maxContentWidth,
  feedbackUrlTarget,
  headerUrlTarget,
  testId,
}) => {
  return (
    <goa-microsite-header
      type={type}
      version={version}
      feedbackurl={feedbackUrl}
      data-testid={testId}
      maxcontentwidth={maxContentWidth}
      feedbackurltarget={feedbackUrlTarget}
      headerurltarget={headerUrlTarget}
    />
  );
};

export default GoAMicrositeHeader;
