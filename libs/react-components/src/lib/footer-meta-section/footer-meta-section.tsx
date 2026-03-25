import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabAppFooterMetaSectionProps extends DataAttributes {
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /** TO REVIEW: Links or other elements rendered inside the footer meta section. */
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
