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
  /**
   * Maximum number of columns to display links in on larger screens.
   * @default 1
   */
  maxColumnCount?: number;
  /**
   * The section heading displayed above the navigation links.
   * @default ""
   */
  heading?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
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
