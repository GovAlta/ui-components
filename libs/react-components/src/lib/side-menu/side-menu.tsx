import { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-side-menu": React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoASideMenuProps {
  testId?: string;
  children: ReactNode;
}

// legacy
export type SideMenuProps = GoASideMenuProps;

export function GoASideMenu(props: GoASideMenuProps): JSX.Element {
  return <goa-side-menu data-testid={props.testId}>{props.children}</goa-side-menu>;
}

export default GoASideMenu;
