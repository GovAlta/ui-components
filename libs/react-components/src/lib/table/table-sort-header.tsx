import { DataAttributes, GoabTableSortDirection, GoabTableSortOrder } from "@abgov/ui-components-common";

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
  name?: string;
  direction?: GoabTableSortDirection;
  sortOrder?: GoabTableSortOrder;
  children?: React.ReactNode;
}

export function GoabTableSortHeader({
  name,
  direction = "none",
  sortOrder,
  children,
  ...rest
}: GoabTableSortProps): JSX.Element {
  return (
    <goa-table-sort-header name={name} direction={direction} sort-order={sortOrder} {...rest}>
      {children}
    </goa-table-sort-header>
  );
}

export default GoabTableSortHeader;
