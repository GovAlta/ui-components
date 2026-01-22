import { ReactNode, type JSX } from "react";
import { GoabIconType, Margins } from "@abgov/ui-components-common";

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
