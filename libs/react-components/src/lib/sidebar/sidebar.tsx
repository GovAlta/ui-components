import React, { ReactNode } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-sidebar": React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface SidebarProps {
  children: ReactNode;
}

export function GoASidebar(props: SidebarProps) {
  return <goa-sidebar>{props.children}</goa-sidebar>;
}

export default GoASidebar;
