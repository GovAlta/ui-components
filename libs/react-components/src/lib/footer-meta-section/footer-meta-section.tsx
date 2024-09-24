import { ReactNode } from "react";

interface WCProps {
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-meta-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoAAppFooterMetaSectionProps {
  testId?: string;
  children?: ReactNode;
}

// legacy name
export type FooterMetaSectionProps = GoAAppFooterMetaSectionProps;

export function GoAAppFooterMetaSection({ testId, children }: GoAAppFooterMetaSectionProps) {
  return (
    <goa-app-footer-meta-section
      testid= {testId}
      slot="meta"
    >
      {children}
    </goa-app-footer-meta-section>
  );
}

export default GoAAppFooterMetaSection;
