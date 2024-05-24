import { ReactNode } from "react";

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
export interface ABGovFooterNavSectionProps {
  maxColumnCount?: number;
  heading?: string;
  testId?: string;
  children?: ReactNode;
}

export function ABGovAppFooterNavSection({
  heading,
  maxColumnCount = 1,
  testId,
  children,
}: ABGovFooterNavSectionProps) {
  return (
    <goa-app-footer-nav-section
      slot="nav"
      heading={heading}
      maxcolumncount={maxColumnCount}
      data-testid={testId}
    >
      {children}
    </goa-app-footer-nav-section>
  );
}

export default ABGovAppFooterNavSection;
