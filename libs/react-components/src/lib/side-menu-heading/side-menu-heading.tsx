import { GoABIconType } from "@abgov/ui-components-common";
import { ReactNode } from "react";

interface WCProps {
  icon?: GoABIconType;
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
export interface GoABSideMenuHeadingProps {
  meta?: ReactNode;
  testId?: string;
  icon?: GoABIconType;
  children?: ReactNode;
}

export function GoABSideMenuHeading(props: GoABSideMenuHeadingProps) {
  return (
    <goa-side-menu-heading icon={props.icon} data-testid={props.testId}>
      {props.children}
      {props.meta && <span slot="meta">{props.meta}</span>}
    </goa-side-menu-heading>
  );
}

export default GoABSideMenuHeading;
