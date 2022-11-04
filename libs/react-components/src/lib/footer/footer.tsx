import React, { ReactNode } from "react";

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
export interface FooterProps {
  maxContentWidth?: string;
  children?: ReactNode;
}

export function GoAAppFooter({ maxContentWidth, children }: FooterProps) {
  return (
    <goa-app-footer maxcontentwidth={maxContentWidth}>
      {children}
    </goa-app-footer>
  );
}

export default GoAAppFooter;
