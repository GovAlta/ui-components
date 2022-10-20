import React, { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-meta-section": React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface FooterMetaSectionProps {
  children?: ReactNode;
}

export function GoAAppFooterMetaSection({ children }: FooterMetaSectionProps) {
  return (
    <goa-app-footer-meta-section slot="meta">
      {children}
    </goa-app-footer-meta-section>
  );
}

export default GoAAppFooterMetaSection;
