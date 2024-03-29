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
  children: ReactNode;
}

// legacy
export type SideMenuProps = GoASideMenuProps;

export function GoASideMenu(props: GoASideMenuProps): JSX.Element {
  return <goa-side-menu>{props.children}</goa-side-menu>;
}

export default GoASideMenu;
