import React, { FC } from "react";
export type Direction = "asc" | "desc" | "none";

interface WCProps {
  name?: string;
  direction?: Direction;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-table-sort-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoATableSortProps {
  name?: string;
  direction?: Direction;
  children?: React.ReactNode;
}

export const GoATableSortHeader: FC<GoATableSortProps> = ({
  name,
  direction = "none",
  children,
}) => {
  return (
    <goa-table-sort-header name={name} direction={direction}>
      {children}
    </goa-table-sort-header>
  );
};

export default GoATableSortHeader;
