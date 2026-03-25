import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

interface WCProps {
  maxcolumncount?: number;
  heading?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-footer-nav-section": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabxFooterNavSectionProps extends DataAttributes {
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
  /** TO DO: Write a description */
  children?: ReactNode;
}

export function GoabxAppFooterNavSection({
  children,
  ...rest
}: GoabxFooterNavSectionProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-footer-nav-section slot="nav" {..._props}>
      {children}
    </goa-app-footer-nav-section>
  );
}

export default GoabxAppFooterNavSection;
