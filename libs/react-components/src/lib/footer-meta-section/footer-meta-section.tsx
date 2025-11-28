import { ReactNode } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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
export interface GoabAppFooterMetaSectionProps extends DataGridProps {
  testId?: string;
  children?: ReactNode;
}

export function GoabAppFooterMetaSection(props: GoabAppFooterMetaSectionProps) {
  const _props = extractProps<WCProps>(props, {
    attributeMapping: "lowercase",
  });

  return (
    <goa-app-footer-meta-section slot="meta" {..._props}>
      {props.children}
    </goa-app-footer-meta-section>
  );
}

export default GoabAppFooterMetaSection;
