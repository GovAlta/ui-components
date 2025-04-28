import { ReactNode } from "react";

interface WCProps {
  maxcolumncount?: number;
  heading?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-nav-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabFooterNavSectionProps {
  maxColumnCount?: number;
  heading?: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabAppFooterNavSection({
  heading,
  maxColumnCount = 1,
  testId,
  children,
}: GoabFooterNavSectionProps) {
  return (
    <goa-app-footer-nav-section
      slot="nav"
      heading={heading}
      maxcolumncount={maxColumnCount}
      testid={testId}
    >
      {children}
    </goa-app-footer-nav-section>
  );
}

export default GoabAppFooterNavSection;
