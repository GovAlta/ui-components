import { GoabIconType } from "@abgov/ui-components-common";
import { ReactNode } from "react";

/* eslint-disable-next-line */
export interface GoabSideMenuHeadingProps {
  /** TO DO: Write a description */
  meta?: ReactNode;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "section-heading"
   */
  testId?: string;
  /** Icon displayed before the heading text. */
  icon?: GoabIconType;
  /** TO DO: Write a description */
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
