import { ReactNode } from "react";

interface WCProps {
  maxcontentwidth?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface ABGovAppFooterProps {
  maxContentWidth?: string;
  children?: ReactNode;
  testId?: string;
}

// legacy name
export type FooterProps = ABGovAppFooterProps;

export function ABGovAppFooter({
  maxContentWidth,
  children,
  testId,
}: ABGovAppFooterProps): JSX.Element {
  return (
    <goa-app-footer maxcontentwidth={maxContentWidth} data-testid={testId}>
      {children}
    </goa-app-footer>
  );
}

export default ABGovAppFooter;
