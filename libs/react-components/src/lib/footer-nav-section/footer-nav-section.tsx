import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  maxcolumncount?: number;
  heading?: string;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabFooterNavSectionProps extends DataAttributes {
  maxColumnCount?: number;
  heading?: string;
  testId?: string;
  children?: ReactNode;
}

export function GoabAppFooterNavSection({
  children,
  ...rest
}: GoabFooterNavSectionProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-footer-nav-section slot="nav" {..._props}>
      {children}
    </goa-app-footer-nav-section>
  );
}

export default GoabAppFooterNavSection;
