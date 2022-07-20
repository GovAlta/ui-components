import React, { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-app-footer': React.HTMLAttributes<HTMLElement>
    }
  }
}

/* eslint-disable-next-line */
export interface FooterProps {
  children: ReactNode;
}

export function GoAAppFooter({children}: FooterProps) {
  return (
    <goa-app-footer>
      {children}
    </goa-app-footer>
  );
}

export default GoAAppFooter;
