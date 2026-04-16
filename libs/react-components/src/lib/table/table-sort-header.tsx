import {
  DataAttributes,
  GoabTableSortDirection,
  GoabTableSortOrder,
} from "@abgov/ui-components-common";

import type { JSX } from "react";

interface WCProps {
  name?: string;
  direction?: GoabTableSortDirection;
  "sort-order"?: GoabTableSortOrder;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-table-sort-header": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabTableSortProps extends DataAttributes {
  /** Column name identifier for sorting. */
  name?: string;
  /** Sets the sort direction indicator. @default "none" */
  direction?: GoabTableSortDirection;
  /** Sort order number for multi-column sort display. Used for displaying priority numbers when multiple columns are sorted. */
  sortOrder?: GoabTableSortOrder;
  /** Content rendered inside the sort header button (typically the column heading text). */
  children?: React.ReactNode;
}

/** A set of structured data that is easy for a user to scan, examine, and compare. */
export function GoabTableSortHeader({
  name,
  direction = "none",
  sortOrder,
  children,
  ...rest
}: GoabTableSortProps): JSX.Element {
  return (
    <goa-table-sort-header
      name={name}
      direction={direction}
      sort-order={sortOrder}
      {...rest}
    >
      {children}
    </goa-table-sort-header>
  );
}

export default GoabTableSortHeader;
