import { ReactNode } from "react";

interface WCProps {
  heading: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-side-menu-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface ABGovSideMenuGroupProps {
  heading: string;
  testId?: string;
  children?: ReactNode;
}

export function ABGovSideMenuGroup(props: ABGovSideMenuGroupProps): JSX.Element {
  return (
    <goa-side-menu-group
      heading={props.heading}
      data-testid={props.testId}
    >
      {props.children}
    </goa-side-menu-group>
  );
}

export default ABGovSideMenuGroup;
