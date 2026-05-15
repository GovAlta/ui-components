import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

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
export interface GoabFooterNavSectionProps extends DataAttributes {
  /** The section heading displayed above the navigation links. */
  heading?: string;
  /** Maximum number of columns to display links in on larger screens. @default 1 */
  maxColumnCount?: number;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Anchor link elements rendered as footer navigation links. */
  children?: ReactNode;
}

/** Navigation links section in footer. */
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
