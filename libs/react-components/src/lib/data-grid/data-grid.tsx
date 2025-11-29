import React from "react";

interface WCProps {
  "keyboard-icon"?: string;
  "keyboard-icon-position"?: "left" | "right";
  "keyboard-nav"?: "layout" | "table";
  version?: string;
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
  keyboardIconPosition?: "left" | "right";
  keyboardNav: "layout" | "table";
  children?: React.ReactNode;
}

export function GoabDataGrid({ keyboardIcon = true, keyboardIconPosition = "left", keyboardNav, children }: GoabDataGridProps) {
  return (
    <goa-data-grid
      keyboard-icon={keyboardIcon ? "true" : "false"}
      keyboard-icon-position={keyboardIconPosition}
      keyboard-nav={keyboardNav}
      version={"2"}
    >
      {children}
    </goa-data-grid>
  );
}

export default GoabDataGrid;
