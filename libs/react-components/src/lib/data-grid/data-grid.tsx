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
  /**
   * Controls visibility of the keyboard navigation indicator icon. Use "visible" to show or "hidden" to hide.
   * @default "visible"
   */
  keyboardIconVisibility?: "visible" | "hidden";
  /**
   * Position of the keyboard navigation indicator icon.
   * @default "left"
   */
  keyboardIconPosition?: "left" | "right";
  /**
   * Navigation mode. "table" navigates like a table (up/down between rows), "layout" allows wrapping between rows with left/right arrows.
   * @default "table"
   */
  keyboardNav: "layout" | "table";
  /** TO REVIEW: The column or row elements rendered inside the data grid. */
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
