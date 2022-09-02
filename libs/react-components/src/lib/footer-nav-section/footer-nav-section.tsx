import React, { ReactNode } from "react";

interface WCProps {
  name?: string;
  maxcolumncount?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-app-footer-nav-section': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

/* eslint-disable-next-line */
interface FooterNavSectionProps {
  name: string;
  maxColumnCount?: number;
  children?: ReactNode;
}


export function GoAAppFooterNavSection({name, maxColumnCount = 1, children}: FooterNavSectionProps) {
  return (
    <goa-app-footer-nav-section slot="nav" name={name} maxcolumncount={maxColumnCount}>
      {children}
    </goa-app-footer-nav-section>
  );
}

export default GoAAppFooterNavSection;
