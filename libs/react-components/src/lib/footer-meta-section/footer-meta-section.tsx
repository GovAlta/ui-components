import { ReactNode } from "react";

interface WCProps {
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-meta-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabAppFooterMetaSectionProps {
  testId?: string;
  children?: ReactNode;
}

export function GoabAppFooterMetaSection({
  testId,
  children,
}: GoabAppFooterMetaSectionProps) {
  return (
    <goa-app-footer-meta-section testid={testId} slot="meta">
      {children}
    </goa-app-footer-meta-section>
  );
}

export default GoabAppFooterMetaSection;
