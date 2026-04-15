import React from "react";

interface WCProps {
  "keyboard-icon-visibility"?: "visible" | "hidden";
  "keyboard-icon-position"?: "left" | "right";
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
  keyboardIconVisibility?: "visible" | "hidden";
  keyboardIconPosition?: "left" | "right";
  keyboardNav: "layout" | "table";
  children?: React.ReactNode;
}

export function GoabDataGrid({
  keyboardIconVisibility = "visible",
  keyboardIconPosition = "left",
  keyboardNav,
  children,
}: GoabDataGridProps) {
  return (
    <goa-data-grid
      keyboard-icon-visibility={keyboardIconVisibility}
      keyboard-icon-position={keyboardIconPosition}
      keyboard-nav={keyboardNav}
    >
      {children}
    </goa-data-grid>
  );
}

export default GoabDataGrid;
