import React, { ReactNode } from "react";

interface WCProps {
  maxcolumncount?: number;
  heading?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-nav-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
interface FooterNavSectionProps {
  maxColumnCount?: number;
  heading?: string;
  children?: ReactNode;
}

export function GoAAppFooterNavSection({
  heading,
  maxColumnCount = 1,
  children,
}: FooterNavSectionProps) {
  return (
    <goa-app-footer-nav-section
      slot="nav"
      heading={heading}
      maxcolumncount={maxColumnCount}
    >
      {children}
    </goa-app-footer-nav-section>
  );
}

export default GoAAppFooterNavSection;
