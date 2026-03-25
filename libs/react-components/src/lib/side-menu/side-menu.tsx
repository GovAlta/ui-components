import { ReactNode, type JSX } from "react";

/* eslint-disable-next-line */
export interface GoabSideMenuProps {
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * TO REVIEW: Navigation items rendered inside the side menu.
   * @required
   */
  children: ReactNode;
}

export function GoabSideMenu(props: GoabSideMenuProps): JSX.Element {
  return <goa-side-menu testid={props.testId}>{props.children}</goa-side-menu>;
}

export default GoabSideMenu;
