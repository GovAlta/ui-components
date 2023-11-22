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
interface SideMenuGroupProps {
  heading: string;
  children?: ReactNode;
}

export function GoASideMenuGroup(props: SideMenuGroupProps): JSX.Element {
  return (
    <goa-side-menu-group heading={props.heading}>
      {props.children}
    </goa-side-menu-group>
  );
}

export default GoASideMenuGroup;
