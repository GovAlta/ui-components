import { GoabIconType } from "@abgov/ui-components-common";
import { ReactNode } from "react";

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
