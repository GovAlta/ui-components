import { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-meta-section": React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface ABGovAppFooterMetaSectionProps {
  testId?: string;
  children?: ReactNode;
}

export function ABGovAppFooterMetaSection({ testId, children }: ABGovAppFooterMetaSectionProps) {
  return (
    <goa-app-footer-meta-section
      data-testid= {testId}
      slot="meta"
    >
      {children}
    </goa-app-footer-meta-section>
  );
}

export default ABGovAppFooterMetaSection;
