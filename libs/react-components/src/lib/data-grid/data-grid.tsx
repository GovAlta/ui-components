import React from "react";

interface WCProps {
  "keyboard-icon"?: string;
  "keyboard-nav"?: "layout" | "table";
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-data-grid": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabDataGridProps {
  keyboardIcon?: boolean;
  keyboardNav: "layout" | "table";
  children?: React.ReactNode;
}

export function GoabDataGrid({ keyboardIcon = true, keyboardNav, children }: GoabDataGridProps) {
  return (
    <goa-data-grid
      keyboard-icon={keyboardIcon ? "true" : undefined}
      keyboard-nav={keyboardNav}
    >
      {children}
    </goa-data-grid>
  );
}

export default GoabDataGrid;
