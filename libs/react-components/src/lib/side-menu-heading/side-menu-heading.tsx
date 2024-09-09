import { GoabIconType } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps {
  testid?: string;
  icon?: GoabIconType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
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

export function GoabSideMenuHeading(props: GoabSideMenuHeadingProps) {
  return (
    <goa-side-menu-heading icon={props.icon} testid={props.testId}>
      {props.children}
      {props.meta && <span slot="meta">{props.meta}</span>}
    </goa-side-menu-heading>
  );
}

export default GoabSideMenuHeading;
