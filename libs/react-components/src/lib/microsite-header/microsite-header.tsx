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
}

export interface HeaderProps {
  type: ServiceLevel;
  version?: string;
  feedbackUrl?: string;
}

export const GoAMicrositeHeader: FC<HeaderProps> = ({
  type,
  version,
  feedbackUrl,
}) => {
  return (
    <goa-microsite-header
      type={type}
      version={version}
      feedbackurl={feedbackUrl}
    />
  );
};

export default GoAMicrositeHeader;
