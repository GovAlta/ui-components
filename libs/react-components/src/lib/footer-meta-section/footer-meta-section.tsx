import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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
export interface GoabAppFooterMetaSectionProps extends DataAttributes {
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Anchor link elements rendered as footer meta navigation links. */
  children?: ReactNode;
}

export function GoabAppFooterMetaSection({
  children,
  ...rest
}: GoabAppFooterMetaSectionProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-footer-meta-section slot="meta" {..._props}>
      {children}
    </goa-app-footer-meta-section>
  );
}

export default GoabAppFooterMetaSection;
