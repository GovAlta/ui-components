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
export interface GoABAppFooterProps {
  maxContentWidth?: string;
  children?: ReactNode;
  testId?: string;
}

// legacy name
export type FooterProps = GoABAppFooterProps;

export function GoABAppFooter({
  maxContentWidth,
  children,
  testId,
}: GoABAppFooterProps): JSX.Element {
  return (
    <goa-app-footer maxcontentwidth={maxContentWidth} data-testid={testId}>
      {children}
    </goa-app-footer>
  );
}

export default GoABAppFooter;
