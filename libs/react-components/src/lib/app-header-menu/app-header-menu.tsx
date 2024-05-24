import { ReactNode } from "react";
import { ABGovIconType } from "@abgov/ui-components-common";

interface WCProps {
  heading: string;
  leadingicon?: ABGovIconType;
}

/* eslint-disable-next-line */
export interface ABGovAppHeaderMenuProps {
  heading: string;
  leadingIcon?: ABGovIconType;
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

export function ABGovAppHeaderMenu(props: ABGovAppHeaderMenuProps) {
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

export default ABGovAppHeaderMenu;
