import { ReactNode } from "react";
import { GoAIconType } from "../icon/icon";

interface WCProps {
  heading: string;
  icon?: GoAIconType;
  testid?: string;
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
export interface GoASideMenuGroupProps {
  heading: string;
  icon?: GoAIconType;
  testId?: string;
  children?: ReactNode;
}

export function GoASideMenuGroup(props: GoASideMenuGroupProps): JSX.Element {
  return (
    <goa-side-menu-group
      heading={props.heading}
      icon={props.icon}
      testid={props.testId}
    >
      {props.children}
    </goa-side-menu-group>
  );
}

export default GoASideMenuGroup;
