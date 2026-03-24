import { GoabIconType } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps {
  testid?: string;
  icon?: GoabIconType;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-side-menu-heading": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabxSideMenuHeadingProps {
  meta?: ReactNode;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "section-heading"
   */
  testId?: string;
  /** Icon displayed before the heading text. */
  icon?: GoabIconType;
  children?: ReactNode;
  version?: string;
}

export function GoabxSideMenuHeading({
  meta,
  testId,
  icon,
  children,
  version = "2",
}: GoabxSideMenuHeadingProps) {
  return (
    <goa-side-menu-heading icon={icon} testid={testId} version={version}>
      {children}
      {meta && <span slot="meta">{meta}</span>}
    </goa-side-menu-heading>
  );
}

export default GoabxSideMenuHeading;
