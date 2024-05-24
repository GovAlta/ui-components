import { ReactNode } from "react";
import { GoABIconType } from "@abgov/ui-components-common";

interface WCProps {
  heading: string;
  leadingicon?: GoABIconType;
}

/* eslint-disable-next-line */
export interface GoABAppHeaderMenuProps {
  heading: string;
  leadingIcon?: GoABIconType;
  testId?: string;
  children?: ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-app-header-menu": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export function GoABAppHeaderMenu(props: GoABAppHeaderMenuProps) {
  return (
    <goa-app-header-menu
      heading={props.heading}
      leadingicon={props.leadingIcon}
      data-testid={props.testId}
    >
      {props.children}
    </goa-app-header-menu>
  );
}

export default GoABAppHeaderMenu;
