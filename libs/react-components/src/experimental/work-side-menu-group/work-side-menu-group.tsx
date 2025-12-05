import { type JSX } from "react";
import { GoabIconType } from "@abgov/ui-components-common";

interface WCProps {
  heading: string;
  icon: GoabIconType;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-work-side-menu-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabWorkSideMenuGroupProps {
  heading: string;
  icon: GoabIconType;
  testId?: string;
  children?: React.ReactNode;
}

export function GoabxWorkSideMenuGroup(props: GoabWorkSideMenuGroupProps): JSX.Element {
  return (
    <goa-work-side-menu-group
      heading={props.heading}
      icon={props.icon}
      testid={props.testId}
    >
      {props.children}
    </goa-work-side-menu-group>
  );
}

export default GoabxWorkSideMenuGroup;
