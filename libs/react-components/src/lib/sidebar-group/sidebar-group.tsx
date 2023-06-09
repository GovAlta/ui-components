import React, { ReactNode } from "react";

interface WCProps {
  heading: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-sidebar-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
interface SidebarGroupProps {
  heading: string;
  children?: ReactNode;
}

export function GoASidebarGroup(props: SidebarGroupProps) {
  return (
    <goa-sidebar-group heading={props.heading}>
      {props.children}
    </goa-sidebar-group>
  );
}

export default GoASidebarGroup;
