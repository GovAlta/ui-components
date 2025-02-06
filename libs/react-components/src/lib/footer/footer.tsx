import { ReactNode } from "react";

interface WCProps {
  maxcontentwidth?: string;
  testid?: string;
  url?: string;
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
export interface GoabAppFooterProps {
  maxContentWidth?: string;
  children?: ReactNode;
  testId?: string;
  url?: string;
}

// legacy name
export type FooterProps = GoabAppFooterProps;

export function GoabAppFooter({
  maxContentWidth,
  children,
  testId,
  url,
}: GoabAppFooterProps): JSX.Element {
  return (
    <goa-app-footer maxcontentwidth={maxContentWidth} testid={testId} url={url}>
      {children}
    </goa-app-footer>
  );
}

export default GoabAppFooter;
