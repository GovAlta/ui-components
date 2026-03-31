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
export interface GoabSideMenuHeadingProps {
  /** Icon displayed before the heading text. */
  icon?: GoabIconType;
  /** Content rendered in the meta slot, displayed alongside the heading. */
  meta?: ReactNode;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** The heading text or content rendered inside the side menu heading. */
  children?: ReactNode;
}

export function GoabSideMenuHeading({
  meta,
  testId,
  icon,
  children,
}: GoabSideMenuHeadingProps) {
  return (
    <goa-side-menu-heading icon={icon} testid={testId} version="2">
      {children}
      {meta && <span slot="meta">{meta}</span>}
    </goa-side-menu-heading>
  );
}

export default GoabSideMenuHeading;
