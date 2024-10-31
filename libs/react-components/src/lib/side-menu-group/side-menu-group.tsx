import { ReactNode } from "react";
import { GoabIconType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  heading: string;
  icon?: GoabIconType;
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
export interface GoabSideMenuGroupProps extends Margins {
  heading: string;
  icon?: GoabIconType;
  testId?: string;
  children?: ReactNode;
}

export function GoabSideMenuGroup(props: GoabSideMenuGroupProps): JSX.Element {
  return (
    <goa-side-menu-group
      heading={props.heading}
      icon={props.icon}
      testid={props.testId}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
    >
      {props.children}
    </goa-side-menu-group>
  );
}

export default GoabSideMenuGroup;
