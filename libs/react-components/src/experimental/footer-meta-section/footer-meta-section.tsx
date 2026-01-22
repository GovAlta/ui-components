import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

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
export interface GoabxAppFooterMetaSectionProps extends DataAttributes {
  testId?: string;
  children?: ReactNode;
}

export function GoabxAppFooterMetaSection({
  children,
  ...rest
}: GoabxAppFooterMetaSectionProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-footer-meta-section slot="meta" {..._props}>
      {children}
    </goa-app-footer-meta-section>
  );
}

export default GoabxAppFooterMetaSection;
