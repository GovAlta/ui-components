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
  meta?: ReactNode;
  testId?: string;
  icon?: GoabIconType;
  children?: ReactNode;
}

export function GoabSideMenuHeading({ meta, testId, icon, children }: GoabSideMenuHeadingProps) {
  return (
    <goa-side-menu-heading icon={icon} testid={testId} version="2">
      {children}
      {meta && <span slot="meta">{meta}</span>}
    </goa-side-menu-heading>
  );
}

export default GoabSideMenuHeading;
